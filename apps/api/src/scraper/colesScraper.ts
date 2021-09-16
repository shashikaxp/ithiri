import { IScraper, ScrapeItem } from './IScraper';

import puppeteer from 'puppeteer-extra';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const URL =
  'https://www.coles.com.au/catalogues-and-specials/view-all#view=list&saleId=40936&areaName=c-nsw-met&page=1';

export class ColesScraper implements IScraper {
  async getItems() {
    try {
      const browser = await puppeteer.launch();

      const page = await browser.newPage();
      await page.goto(URL, { waitUntil: 'networkidle2' });

      const items: ScrapeItem[] = await page.evaluate(() => {
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
          const regDescription = (
            element.querySelector('span.sf-regoptiondesc') as HTMLElement
          ).innerText;

          // only add single products
          if (optionSuffix === 'each') {
            const currentPrice = Number(
              priceString.replace(/[A-Za-z/$/,\s]*/g, '')
            );
            const beforePrice = Number(
              regDescription.replace(/[A-Za-z/$/,\s]*/g, '')
            );

            const saving = Number((beforePrice - currentPrice).toFixed(2));
            const discount = Number(
              ((currentPrice / beforePrice) * 100).toFixed(2)
            );

            const productData = {
              image: element.querySelector('img')?.getAttribute('src'),
              name: (element.querySelector('a.sf-item-heading') as HTMLElement)
                .innerText,
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
      });

      await browser.close();
      return items;
    } catch (error) {
      if (error instanceof Error) throw Error(error.message);
      throw Error('Error ocurred while scraping');
    }
  }
}
