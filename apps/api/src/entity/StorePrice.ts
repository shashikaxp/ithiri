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
  id: number;

  @Field()
  itemId: number;

  @Field()
  storeId: number;

  @Field()
  @Column({ type: 'money', nullable: true })
  cwPrice: number;

  @Field()
  @Column({ type: 'money', nullable: true })
  cwSavings: number;

  @Field()
  @Column({ type: 'decimal', nullable: true })
  cwDiscount: number;

  @Field()
  @Column({ type: 'money' })
  nwPrice: number;

  @Field()
  @Column({ type: 'money' })
  nwSavings: number;

  @Field()
  @Column({ type: 'decimal' })
  nwDiscount: number;

  @ManyToOne(() => Item, (item) => item.storePrices)
  public item!: Item;

  @ManyToOne(() => Store, (store) => store.storePrices)
  public store!: Store;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
