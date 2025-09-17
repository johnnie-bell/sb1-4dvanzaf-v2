import { CategoryKey } from './categories';

export interface Item {
  id: string;
  name: string;
  category: CategoryKey;
  pricePerDay: number; // in cents
  imageUrl: string;
}

export interface DateRange {
  from?: Date;
  to?: Date;
}

export interface CartItem {
  item: Item;
  dateRange: DateRange;
  weeklyPrice: number;
}