import { Store } from './Store';
import { Field, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Item } from './Item';

@ObjectType()
@Entity()
export class StorePrice extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  itemId!: number;

  @Field()
  storeId!: number;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', nullable: true })
  cwPrice!: number | null;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', nullable: true })
  cwSavings!: number | null;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', nullable: true })
  cwDiscount!: number | null;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', nullable: true })
  nwPrice!: number | null;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', nullable: true })
  nwSavings!: number | null;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', nullable: true })
  nwDiscount!: number | null;

  @ManyToOne(() => Item, (item) => item.storePrices)
  public item!: Item;

  @ManyToOne(() => Store, (store) => store.storePrices)
  public store!: Store;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;
}
