import puppeteer from 'puppeteer';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

import { SCRAPE_DELAY_PER_PAGE } from './../constants';
import { sleeper } from './util/sleeper';
import { saveScrapedItems } from './saveScrapedItems';
import { ScrapeItem } from './types/IScraper';
import { colesScraper } from './util/colesScraper';
import { woolworthsScraper } from './util/woolworthsScraper';

export const scrapeNextWeekItems = async (
  storeName: string,
  url: string,
  startPage: number,
  endPage: number
) => {
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
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
    });

    for (let i = startPage; i < endPage; i++) {
      const page = await browser.newPage();
      const newUrl = url + `&page=${i}`;
      await page.goto(newUrl, { waitUntil: 'networkidle2' });

      if (storeId === 2) {
        await page.setCookie({
          name: 'sf-locationId',
          value: '4922',
        });
        // reload only in starting page
        if (i == startPage) await page.reload();
      }

      console.log(`Fetching items page: ${i}`);
      const items: ScrapeItem[] = await page.evaluate(scapingFn);
      data.push(...items);
      await page.close();
      console.log(
        `Fetching items complete for page ${i}: ${items.length} items`
      );
      await sleeper(SCRAPE_DELAY_PER_PAGE);
    }

    await browser.close();

    await saveScrapedItems(data, storeId);
  } catch (error) {
    if (error instanceof Error)
      throw Error('Error ocurred while scraping items' + error.message);
  }
};
