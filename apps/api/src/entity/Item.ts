import { Favourite } from './Favourite';
import { StorePrice } from './StorePrice';
import { Field, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@ObjectType()
@Entity()
export class Item extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  storeId!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  image!: string;

  @Field()
  @Column({ nullable: true })
  category?: string;

  @Field()
  @Column({ type: 'decimal' })
  price!: number;

  @OneToMany(() => StorePrice, (sp) => sp.item)
  storePrices!: StorePrice[];

  @OneToMany(() => Favourite, (f) => f.item)
  favourites!: Favourite[];

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;
}
