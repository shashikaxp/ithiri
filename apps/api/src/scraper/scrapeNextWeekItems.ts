import puppeteer from 'puppeteer-extra';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

import { SCRAPE_DELAY_PER_PAGE } from './../constants';
import { sleeper } from './util/sleeper';
import { ScrapeItem } from './types/IScraper';
import { colesScraper } from './util/colesScraper';
import { woolworthsScraper } from './util/woolworthsScraper';

export const scrapeNextWeekItems = async (
  storeName: string,
  url: string,
  startPage: number,
  endPage: number
): Promise<{
  data: ScrapeItem[];
  storeId: number;
}> => {
  try {
    let storeId: number;
    const data: ScrapeItem[] = [];
    let scapingFn: () => ScrapeItem[];

    //TODO get store ids from database
    if (storeName === 'woolworths') {
      storeId = 2;
      scapingFn = woolworthsScraper;
    } else {
      storeId = 1;
      scapingFn = colesScraper;
    }

    // Woolworths only works in headless:false browser :S
    // @ts-ignore
    const browser = await puppeteer.launch({ headless: false });

    for (let i = startPage; i < endPage; i++) {
      const page = await browser.newPage();
      const newUrl = url + `&page=${i}`;
      await page.goto(newUrl, { waitUntil: 'networkidle2' });


      
      
      console.log(newUrl);
      if (storeId === 2) {
        console.log('SEtting Cokkie'); 
        await page.setCookie({
          name: 'sf-locationId',
          value: '5311',
          expires: Date.now() / 1000 + 10,
          domain: 'www.woolworths.com.au'
        });
        // reload only in starting page
        if (i == startPage) await page.reload();
      }
      await sleeper(10000);
      console.log(`Fetching items page: ${i}`);
      const items: ScrapeItem[] = await page.evaluate(scapingFn);
      data.push(...items);
      // await page.close();
      console.log(
        `Fetching items complete for page ${i}: ${items.length} items`
      );
      await sleeper(SCRAPE_DELAY_PER_PAGE);
    }

    // await browser.close();
    return {
      data,
      storeId,
    };
  } catch (error) {
    if (error instanceof Error)
      throw Error('Error ocurred while scraping items' + error.message);
    throw Error('Error ocurred while scraping items');
  }
};
