import { User } from './../entity/User';
import { Item } from './../entity/Item';
import { MyContext } from './../types';
import { Favourite } from './../entity/Favourite';
import { Resolver, Arg, Ctx, Mutation } from 'type-graphql';

@Resolver()
export class FavouriteResolver {
  @Mutation(() => Boolean)
  async favourite(
    @Arg('itemId') itemId: number,
    @Ctx() { em, req }: MyContext
  ) {
    const item = await em.findOne(Item, { id: itemId });

    if (!item) {
      return false;
    }
    const favouriteItem = await em.findOne(Favourite, { item: item });

    if (favouriteItem) {
      await em.delete(Favourite, { id: favouriteItem.id });
      return true;
    } else {
      const userId = req.session.userId;
      if (!userId) return false;
      const user = await em.findOne(User, { id: userId });
      const newFavouriteItem = await em.create(Favourite, {
        user: user,
        item: item,
      });
      await newFavouriteItem.save();
      return true;
    }
  }
}
