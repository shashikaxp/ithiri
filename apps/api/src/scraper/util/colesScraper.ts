export const colesScraper = () => {
  const pageProducts: any[] = [];

  const nodeElements = document
    .querySelectorAll('div[id="sf-items-table"]')[0]
    .querySelectorAll('.sf-item');

  for (let i = 0; i < nodeElements.length; i += 1) {
    const element = nodeElements[i];

    const priceString = (
      element.querySelector('span.sf-pricedisplay') as HTMLElement
    ).innerText;

    const optionSuffix = (
      element.querySelectorAll(
        '.sf-nowprice span.sf-optionsuffix'
      )[0] as HTMLElement
    ).innerText;

    const discountedPrice = (
      element.querySelector('span.sf-regprice') as HTMLElement
    )?.innerText;

    const description = (
      element.querySelector('span.sf-regoptiondesc') as HTMLElement
    )?.innerText;

    const name = (element.querySelector('a.sf-item-heading') as HTMLElement)
      .innerText;

    // only add single products
    if (
      optionSuffix === 'each' &&
      discountedPrice &&
      !name.includes('Coles') &&
      description &&
      description.includes('Save')
    ) {
      const currentPrice = Number(priceString.replace(/[A-Za-z/$/,\s]*/g, ''));
      const saving = Number(discountedPrice.replace(/[A-Za-z/$/,\s]*/g, ''));

      const beforePrice = Number((saving + currentPrice).toFixed(2));
      const discount = Number((saving / beforePrice).toFixed(4)) * 100;

      const productData = {
        image: element.querySelector('img')?.getAttribute('src'),
        name: name,
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
