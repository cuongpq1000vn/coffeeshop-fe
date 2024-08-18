import { OrderList } from "@/components/organisms";

export default function OrderManager() {
  return (
    <div className="ml-5 mr-5">
      <h1 className="mb-5 text-black text-3xl font-bold">Order Board</h1>
      <OrderList />
    </div>
  );
}
