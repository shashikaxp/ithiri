import { MyContext } from './../types';
import { ShoppingListType, Week, WeeklyItem } from '@ithiri/shared-types';
import {
  Resolver,
  Arg,
  Query,
  UseMiddleware,
  Mutation,
  Ctx,
} from 'type-graphql';

import { mapToStorePrices } from './util/mapToStorePrices';
import { min, find } from 'lodash';
import { getStorePriceByItem } from './util/storePrices';
import {
  ShoppingItem,
  ShoppingList,
  ShoppingListResponse,
  WeeklyItemInput,
} from './types/shoppingList';
import { isAuth } from './../middleware/isAuth';
import { StorePriceResponse } from './types/listItem';
import { COLES_ID, WOOLWORTHS_ID } from '../constants';
import { sendEmail } from '../utils/sendEmail';
import { User } from '../entity/User';

@Resolver()
export class ListItemResolver {
  @Query(() => ShoppingListResponse)
  @UseMiddleware(isAuth)
  async generateShoppingList(
    @Arg('weeklyItemInput') { weeklyItems, week }: WeeklyItemInput
  ): Promise<ShoppingListResponse> {
    const itemIds = weeklyItems.map((i) => i.itemId);

    const itemDetails = await getStorePriceByItem(itemIds);
    if (!itemDetails) throw Error('Cannot find store prices');

    const storePrices = mapToStorePrices(itemDetails, []);
    const bestValueShoppingList = generateBestValueShoppingList(
      weeklyItems,
      storePrices,
      week,
      'best-value'
    );

    const wooliesShoppingList = generateBestValueShoppingList(
      weeklyItems,
      storePrices,
      week,
      'woolworths'
    );

    const colesShoppingList = generateBestValueShoppingList(
      weeklyItems,
      storePrices,
      week,
      'coles'
    );

    return {
      shoppingLists: [
        bestValueShoppingList,
        wooliesShoppingList,
        colesShoppingList,
      ],
    };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async emailShoppingList(
    @Arg('weeklyItemInput') weeklyItemInput: WeeklyItemInput,
    @Ctx() { req, em }: MyContext
  ) {
    const userId = req.session.userId;
    const user = await em.findOne(User, { id: userId });
    const shoppingList = await this.generateShoppingList(weeklyItemInput);
    if (user) {
      await sendEmail(user.email, shoppingList, 'shoppingList');
      return true;
    } else {
      throw Error('Email is not found');
    }
  }
}

const generateBestValueShoppingList = (
  itemDetails: WeeklyItem[],
  storePrices: StorePriceResponse[],
  week: Week,
  type: ShoppingListType
): ShoppingList => {
  const shoppingItems: ShoppingItem[] = [];
  let totalSavings = 0;

  storePrices.map((sp) => {
    const quantity = find(itemDetails, { itemId: sp.itemId })?.quantity || 1;
    const itemPrices = sp.storePrices.map((sp) => getItemPrices(sp, week));

    let minPrice: number = sp.originalPrice;

    // TODO use dynamic it instead hard code values
    switch (type) {
      case 'best-value':
        minPrice = min(itemPrices.map((ip) => ip.price)) || sp.originalPrice;
        break;
      case 'coles':
        minPrice =
          find(itemPrices, { storeId: COLES_ID })?.price || sp.originalPrice;
        break;
      case 'woolworths':
        minPrice =
          find(itemPrices, { storeId: WOOLWORTHS_ID })?.price ||
          sp.originalPrice;
        break;
      default:
        break;
    }

    const totalSavingsForItem = getTotalSavingsForItem(
      sp.originalPrice,
      minPrice,
      quantity
    );

    totalSavings += totalSavingsForItem;

    const itemDetailsForMinPrice = find(itemPrices, { price: minPrice });
    shoppingItems.push({
      storeId: itemDetailsForMinPrice ? itemDetailsForMinPrice.storeId : null,
      image: sp.img,
      name: sp.name,
      originalPrice: itemDetailsForMinPrice ? sp.originalPrice : null,
      price: itemDetailsForMinPrice ? itemDetailsForMinPrice.price : null,
      discount: itemDetailsForMinPrice ? itemDetailsForMinPrice.discount : null,
      saving: itemDetailsForMinPrice ? itemDetailsForMinPrice.saving : null,
      quantity: itemDetailsForMinPrice ? quantity : null,
      total: itemDetailsForMinPrice?.price
        ? quantity * itemDetailsForMinPrice.price
        : null,
    });
  });

  return {
    type,
    storeItems: shoppingItems,
    totalSavings: totalSavings,
  };
};

const getItemPrices = (
  storePrices: StorePriceResponse['storePrices'][0],
  week: Week
): Pick<ShoppingItem, 'price' | 'saving' | 'discount' | 'storeId'> => {
  if (week === 'thisWeek') {
    return {
      storeId: storePrices.storeId,
      price: storePrices.cwPrice,
      saving: storePrices.cwSavings,
      discount: storePrices.cwDiscount,
    };
  } else {
    return {
      storeId: storePrices.storeId,
      price: storePrices.nwPrice,
      saving: storePrices.nwSavings,
      discount: storePrices.nwDiscount,
    };
  }
};

const getTotalSavingsForItem = (
  originalPrice: number,
  discountedPrice: number,
  quantity: number
) => {
  const originalAmount = originalPrice * quantity;
  const discountAmount = discountedPrice * quantity;
  return originalAmount - discountAmount;
};
