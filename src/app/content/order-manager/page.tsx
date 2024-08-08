import { OrderList } from "@/components/organisms";

export default function OrderManager() {
  return (
    <div className="p-10">
      <h1 className="mb-5">Order Board</h1>
      <OrderList />
    </div>
  );
}
