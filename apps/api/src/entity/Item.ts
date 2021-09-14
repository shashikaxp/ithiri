import { StorePrice } from './StorePrice';
import { Field, Float, ObjectType } from 'type-graphql';
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
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  image: string;

  @Field()
  @Column({ nullable: true })
  category: string;

  @Field()
  @Column({ type: 'money' })
  price: number;

  @OneToMany(() => StorePrice, (sp) => sp.item)
  storePrices!: StorePrice[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
