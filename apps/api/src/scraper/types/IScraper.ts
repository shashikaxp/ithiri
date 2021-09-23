export interface ScrapeItem {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  savings: number;
  discount: number;
  currentPrice: number;
}

export interface IScraper {
  getItems: (
    baseUrl: string,
    startPage: number,
    endPage: number
  ) => Promise<ScrapeItem[]>;
}
