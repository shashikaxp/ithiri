import { RegisterSchema } from './../validations/register.schema';
import {
  Resolver,
  Query,
  Mutation,
  InputType,
  Field,
  Arg,
  Ctx,
  ObjectType,
} from 'type-graphql';
import * as argon from 'argon2';

import { User } from './../entity/User';
import { MyContext } from './../types';

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@InputType()
class EmailAndPasswordInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users() {
    return await User.find();
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: MyContext) {
    if (!req.session.userId) {
      return null;
    }
    const user = await em.findOne(User, { id: req.session.userId });
    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('confirmPassword') confirmPassword: string,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne({ email });
    if (user) {
      return {
        errors: [
          {
            field: 'email',
            message: 'user already exist',
          },
        ],
      };
    } else {
      try {
        await RegisterSchema.validate(
          {
            name,
            email,
            password,
            confirmPassword,
          },
          { abortEarly: false }
        );
        const hashedPassword = await argon.hash(password);
        const user = await em.create(User, {
          name,
          password: hashedPassword,
          email,
        });
        await user.save();
        req.session.userId = user.id;
        return { user };
      } catch (error) {
        return {
          errors: error.inner.map((e) => {
            return {
              field: e.path,
              message: e.errors[0],
            };
          }),
        };
      }
    }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: EmailAndPasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { email: options.email });

    if (!user) {
      return {
        errors: [
          {
            field: 'email',
            message: `No user is registered using ${options.email}`,
          },
        ],
      };
    }

    const validPassword = await argon.verify(user.password, options.password);
    if (!validPassword) {
      return {
        errors: [
          {
            field: 'password',
            message: `Invalid password`,
          },
        ],
      };
    }

    req.session.userId = user.id;

    return {
      user,
    };
  }
}
