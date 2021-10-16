import { User } from './User';

import { Field, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Item } from './Item';

@ObjectType()
@Entity()
export class Favourite extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  itemId!: number;

  @Field()
  userId!: number;

  @ManyToOne(() => Item, (item) => item.favourites, { onDelete: 'CASCADE' })
  public item!: Item;

  @ManyToOne(() => User, (user) => user.favourites)
  public user!: User;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;
}
