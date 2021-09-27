import { template, filter, find } from 'lodash';

import { ShoppingItem, ShoppingList } from '../../resolvers/types/shoppingList';
import { shoppingListRowTemplate, shoppingListTemplate } from './index';

const formatCurrency = (amount: number | null) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  if (!amount) return '-';
  const fixedAmount = Number(amount.toFixed(2));
  return formatter.format(fixedAmount);
};

export const getShoppingListHTML = (shoppingLists: ShoppingList[]) => {
  let template = '';
  const bestValueShoppingList = find(shoppingLists, {
    type: 'best-value',
  });
  const coles = find(shoppingLists, { type: 'coles' });
  const woolies = find(shoppingLists, { type: 'woolworths' });

  if (bestValueShoppingList && coles && woolies) {
    const bestValueTemplate = getBestValueShoppingList(
      formatCurrency(bestValueShoppingList.totalSavings),
      bestValueShoppingList.storeItems
    );
    const colesTemplate = getColesShoppingList(
      formatCurrency(coles.totalSavings),
      coles.storeItems
    );
    const woolworthsTemplate = getWoolworthsShoppingList(
      formatCurrency(woolies.totalSavings),
      woolies.storeItems
    );
    template = bestValueTemplate + colesTemplate + woolworthsTemplate;

    return `
          <div
          style="padding:1rem;color:#4e4e4e!important;background-color:#efefef;font-family:Verdana,Geneva,Tahoma,sans-serif; max-width:800px; margin:0 auto">
            <div>
              <div style="text-align:center; margin-top:2rem; margin-bottom:2rem;">
                <img
                  src="https://ithiri.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fimage%2Fassets%2Fimg%2Flogo.acfbb1243f6badb0c8277c9771bd0e34.png&w=128&q=75"
                  alt="logo" />
              </div>
            </div>
            ${template}
          </div>
          `;
  }
  throw Error('Invalid data');
};

function getBestValueShoppingList(total: string, items: ShoppingItem[]) {
  const coles = filter(items, (si) => si.storeId === 1);
  const woolworths = filter(items, (si) => si.storeId === 2);

  const colesTable = getShoppingListTable(coles);
  const woolworthsTable = getShoppingListTable(woolworths);

  return `
    <div style="background-color:white; padding:1rem; margin-bottom:2rem;">
      <table width="100%" style="font-size:1.2rem; margin-bottom:1rem;">
        <tbody>
          <tr>
            <td width="60%">2 Trips (Coles + Woolworths)</td>
            <td style="text-align: right;">Save ${total}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <div style="margin-bottom:1rem; margin-top:1rem;">
          Coles shopping list
        </div>
        ${
          coles.length > 0
            ? colesTable
            : '<div style="color:#bdbdbd">No items were found</div>'
        }
      </div>
      <div>
        <div style="margin-bottom:1rem; margin-top:1rem; ">
          Woolworths shopping list
        </div>
        ${
          woolworths.length > 0
            ? woolworthsTable
            : '<div style="color:#bdbdbd">No items were found</div>'
        }
      </div>  
    </div>
    `;
}

function getColesShoppingList(total: string, items: ShoppingItem[]) {
  const colesTable = getShoppingListTable(items);
  return `
    <div style="background-color:white; padding:1rem; margin-bottom:2rem;">
      <table width="100%" style="font-size:1.2rem; margin-bottom:1rem;">
        <tbody>
          <tr>
            <td width="60%">1 Trip (Coles)</td>
            <td style="text-align: right;">Save ${total}</td>
          </tr>
        </tbody>
      </table>
      <div>
        ${colesTable}
      </div> 
    </div>
    `;
}

function getWoolworthsShoppingList(total: string, items: ShoppingItem[]) {
  const woolworthsTable = getShoppingListTable(items);
  return `
    <div style="background-color:white; padding:1rem; margin-bottom:2rem;">
      <table width="100%" style="font-size:1.2rem; margin-bottom:1rem;">
        <tbody>
          <tr>
            <td width="60%">1 Trip (Woolworths)</td>
            <td style="text-align: right;">Save ${total}</td>
          </tr>
        </tbody>
      </table>
      <div>
        ${woolworthsTable}
      </div> 
    </div>
    `;
}

function getShoppingListTable(items: ShoppingItem[]) {
  let itemRows = '';
  const compiled = template(shoppingListRowTemplate);

  items.forEach((item) => {
    const itemRow = compiled({
      name: item.name,
      price: formatCurrency(Number(item.price)),
      quantity: item.quantity ? item.quantity : '-',
      total: formatCurrency(Number(item.total)),
    });
    itemRows = itemRows + itemRow;
  });

  const shoppingListCompiled = template(shoppingListTemplate);
  return shoppingListCompiled({
    itemRows: itemRows,
  });
}
