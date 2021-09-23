export const woolworthsScraper = () => {
  const pageProducts: any[] = [];

  const nodeElements = document
    .querySelectorAll('table[id="sf-items-table"]')[0]
    .querySelectorAll('.sf-item');

  for (let i = 0; i < nodeElements.length; i += 1) {
    const element = nodeElements[i];

    const priceString = (
      element.querySelector('span.sf-pricedisplay') as HTMLElement
    )?.innerText;
    const optionSuffix = (
      element.querySelectorAll(
        '.sf-nowprice span.sf-optionsuffix'
      )[0] as HTMLElement
    )?.innerText;
    const regDescription = (
      element.querySelector('span.sf-regprice') as HTMLElement
    )?.innerText;

    // only add single products
    if (optionSuffix == 'each' && regDescription) {
      const currentPrice = Number(priceString.replace(/[A-Za-z/$/,\s]*/g, ''));
      const saving = Number(regDescription.replace(/[A-Za-z/$/,\s]*/g, ''));

      const beforePrice = Number((saving + currentPrice).toFixed(2));
      const discount = Number((saving / beforePrice).toFixed(4)) * 100;

      const productData = {
        image: element.querySelector('img')?.getAttribute('src'),
        name: (
          element.querySelector(
            'a.shelfProductTile-descriptionLink'
          ) as HTMLElement
        ).innerText,
        category: null,
        price: beforePrice,
        currentPrice: currentPrice,
        savings: saving,
        discount: discount,
      };

      pageProducts.push(productData);
    }
  }

  return pageProducts;
};
