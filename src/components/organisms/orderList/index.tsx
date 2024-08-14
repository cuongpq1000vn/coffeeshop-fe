"use client";

import React, { useEffect, useState } from "react";
import styles from "../style/order.module.css";
import { IoSearch } from "react-icons/io5";
import { OrderCard } from "@/components/molecules";
import { OrderDto } from "@/types/dtos/order/OrderDto";
import { PageDTO } from "@/types/Page";
import { getOrderByStatus, handleCancelOrder } from "@/services/OrderService";
import Toast from "@/util/notification";

export default function OrderList() {
  const [newOrder, setNewOrder] = useState<PageDTO<OrderDto> | null>(null);
  const [processOrder, setProcessOrder] = useState<PageDTO<OrderDto> | null>(
    null
  );
  const [cancelOrder, setCancelOrder] = useState<PageDTO<OrderDto> | null>(
    null
  );
  const [doneOrder, setDoneOrder] = useState<PageDTO<OrderDto> | null>(null);

  const updateCancelOrder = async (orderId: string) => {
    try {
      const result: OrderDto = await handleCancelOrder(orderId);
      if (result) {
        Toast.notifySuccess("Cancel order #" + result.code + "successfully");
      }
    } catch (error) {
      console.error("Cannot cancel this order", error);
    }
  };

  const renderNewOrder = async () => {
    try {
      const result: PageDTO<OrderDto> = await getOrderByStatus(
        OrderStatus.PENDING,
        0,
        100,
        new Date(2024, 7, 28),
        new Date(2024, 7, 30)
      );
      setNewOrder(result);
    } catch (error) {
      console.error("Failed to load new order", error);
    }
  };
  const renderProcessOrder = async () => {
    try {
      const result: PageDTO<OrderDto> = await getOrderByStatus(
        OrderStatus.PROCESSING,
        0,
        100,
        new Date(2024, 7, 28),
        new Date(2024, 7, 30)
      );
      setProcessOrder(result);
    } catch (error) {
      console.error("Failed to load process order", error);
    }
  };
  const renderCancelOrder = async () => {
    try {
      const result: PageDTO<OrderDto> = await getOrderByStatus(
        OrderStatus.CANCELLED,
        0,
        100,
        new Date(2024, 7, 28),
        new Date(2024, 7, 30)
      );
      setCancelOrder(result);
    } catch (error) {
      console.error("Failed to load cancel order", error);
    }
  };
  const renderDoneOrder = async () => {
    try {
      const result: PageDTO<OrderDto> = await getOrderByStatus(
        OrderStatus.COMPLETED,
        0,
        100,
        new Date(2024, 7, 28),
        new Date(2024, 7, 30)
      );
      setDoneOrder(result);
    } catch (error) {
      console.error("Failed to load done order", error);
    }
  };

  useEffect(() => {
    renderNewOrder();
    renderDoneOrder();
    renderCancelOrder();
    renderProcessOrder();
  }, [newOrder, processOrder, doneOrder, cancelOrder]);

  return (
    <div>
      <div className="relative mb-5">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <IoSearch />
        </div>

        <input
          type="search"
          className="block w-full p-2 ps-10 text-sm text-gray-900 border-2 border-gray-300 rounded-md bg-gray-50"
          placeholder="Search orders..."
          required
        />
      </div>
      <div>
        <div className="mx-auto grid gap-6 xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-2">
          <div>
            <div
              className={`${styles.headerContainer} flex items-center bg-red-600`}
            >
              <span className={styles.title}>Cancel</span>
            </div>
            {cancelOrder?.content.map((order: OrderDto) => (
              <OrderCard
                key={order.code}
                order={order}
                cancelOrder={updateCancelOrder}
                colorName={"bg-red-600"}
              />
            ))}
          </div>

          <div>
            <div
              className={`${styles.headerContainer} flex items-center bg-yellow-500`}
            >
              <span className={styles.title}>New Orders</span>
            </div>

            {newOrder?.content.map((order: OrderDto) => (
              <OrderCard
                key={order.code}
                order={order}
                cancelOrder={updateCancelOrder}
                colorName={"bg-yellow-500"}
              />
            ))}
          </div>
          <div>
            <div
              className={`${styles.headerContainer} flex items-center bg-neutral-800`}
            >
              <span className={styles.title}>In Progress</span>
            </div>
            {processOrder?.content.map((order: OrderDto) => (
              <OrderCard
                key={order.code}
                order={order}
                cancelOrder={updateCancelOrder}
                colorName={"bg-neutral-800"}
              />
            ))}
          </div>
          <div>
            <div
              className={`${styles.headerContainer} flex items-center bg-blue-500`}
            >
              <span className={styles.title}>Done</span>
            </div>
            {doneOrder?.content.map((order: OrderDto) => (
              <OrderCard
                key={order.code}
                order={order}
                cancelOrder={updateCancelOrder}
                colorName={"bg-blue-500"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
