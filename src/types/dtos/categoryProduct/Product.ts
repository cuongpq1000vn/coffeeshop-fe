import { MetadataDTO } from "@/types/MetaData";

export type ProductDTO = MetadataDTO & {
  id: string;
  storeId: string | null;
  countSale: number;
  name: string;
  price: number;
  normalizedName: string;
  longDescription: string;
  shortDescription: string;
  imgs: string[];
  note: string;
  finalPrice: number;
  discountFrom: number;
  discountTo: number;
  category: number | null;
  discountAmount: number;
  discountPercent: number;
  attributes: string | null;
  live: boolean;
  recommend: boolean;
  deleted: boolean;
};
