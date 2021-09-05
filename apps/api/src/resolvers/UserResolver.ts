import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from './../constants';
import { RegisterSchema } from './../validations/register.schema';
import {
  Resolver,
  Query,
  Mutation,
  Field,
  Arg,
  Ctx,
  ObjectType,
} from 'type-graphql';
import * as argon from 'argon2';
import { v4 } from 'uuid';

import { User } from './../entity/User';
import { MyContext } from './../types';
import { sendEmail } from '../utils/sendEmail';

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

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async changePassword(
    @Ctx() { em, req, redis }: MyContext,
    @Arg('token') token: string,
    @Arg('password') password: string
  ): Promise<UserResponse> {
    // TODO user validation
    const key = FORGET_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);

    if (!userId) {
      return {
        errors: [
          {
            field: 'token',
            message: 'invalid token',
          },
        ],
      };
    }

    const user = await em.findOne(User, { id: parseInt(userId) });
    const hashedPassword = await argon.hash(password);
    user.password = hashedPassword;
    await user.save();
    redis.del(key);

    req.session.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Ctx() { em, redis }: MyContext,
    @Arg('email') email: string
  ) {
    const user = await em.findOne(User, { email });
    if (!user) {
      return true;
    }

    const token = v4();
    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      'ex',
      1000 * 60 * 60
    ); // 1 hour

    const link = `<a href="http://localhost:4200/change-password/${token}">Reset password</a>`;

    await sendEmail(email, link);
    return true;
  }

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
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { email: email });

    if (!user) {
      return {
        errors: [
          {
            field: 'email',
            message: `No user is registered using ${email}`,
          },
        ],
      };
    }

    const validPassword = await argon.verify(user.password, password);
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

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }
}
