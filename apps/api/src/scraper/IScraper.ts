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
  getItems: (page: HTMLElement) => Promise<ScrapeItem[]>;
}
