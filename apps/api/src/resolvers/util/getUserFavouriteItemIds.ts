import { getConnection } from 'typeorm';
import { Favourite } from './../../entity/Favourite';

export async function getUserFavouriteItemIds(userId: number) {
  if (userId) {
    const userFavourites = await getConnection()
      .getRepository(Favourite)
      .createQueryBuilder('favourite')
      .leftJoinAndSelect('favourite.user', 'user')
      .leftJoinAndSelect('favourite.item', 'item')
      .where('favourite.user.id = :id', { id: userId })
      .getMany();

    const favouritesIds = (await userFavourites).map((fv) => fv.item.id);
    return favouritesIds;
  } else {
    return [];
  }
}
