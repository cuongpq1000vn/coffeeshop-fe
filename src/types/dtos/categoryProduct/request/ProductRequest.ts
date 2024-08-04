export type ProductRequest = {
  name: string;
  price: number;
  live: boolean;
  countSale: number;
  finalPrice: number;
  longDescription: string;
  shortDescription: string;
  images: string[];
  storeId: string;
  category: number;
  note: string;
  recommended: boolean;
  discountFrom: Date;
  discountTo: Date;
  discountAmount: number;
  discountPercent: number;
};
