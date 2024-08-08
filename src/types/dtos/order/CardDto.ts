import { UUID } from "crypto";

export type OrderDto = {
  id: UUID;
  storeId: UUID;
  code: string;
  version: number;
  account: string;
  tableName: string;
  note: string;
  currency: string;
  qtyItem: number;
  state: string;
  status: string;
  grandTotal: number;
  baseGrandTotal: number;
  codeVoucher: string;
  paymentType: string;
  orderItems: OrderItemDto[];
};

export type OrderItemDto = {
  id: UUID;
  version: number;
  productId: UUID;
  name: string;
  slug: string;
  currency: string;
  img: string[];
  note: string;
  description: string;
  discountAmount: number;
  discountPercent: number;
  qty: number;
  price: number;
  orderId: UUID;
  orderItemOptions: OrderItemOptionDto[];
};

export type OrderItemOptionDto = {
  id: UUID;
  version: number;
  attributeId: UUID;
  qty: number;
  price: number;
  currency: string;
  customNote: string;
  orderItemId: UUID;
};
