"use client";

import React, { useEffect, useState } from "react";
import styles from "../style/order.module.css";
import { IoSearch } from "react-icons/io5";
import { OrderCard } from "@/components/molecules";
import { OrderDto } from "@/types/dtos/order/OrderDto";
import {
  getOrderByStatus,
  handleCancelOrder,
  handleCompleteOrder,
  handleProcessOrder,
} from "@/services/OrderService";
import Toast from "@/util/notification";
import { OrderStatus } from "@/types/OrderStatus";
import { CircularProgress, Paper } from "@mui/material";

export default function OrderList() {
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [loading, setLoading] = useState(true);

  const updateCancelOrder = async (orderId: string) => {
    try {
      const result: OrderDto = await handleCancelOrder(orderId);
      if (result) {
        Toast.notifySuccess("Cancel order #" + result.code + "successfully");
        setOrders((prevOrders) => {
          return prevOrders.map((order) =>
            order.id === result.id
              ? { ...order, status: OrderStatus.CANCELLED }
              : order
          );
        });
      }
    } catch (error) {
      console.error("Cannot cancel this order", error);
    }
  };

  const updateProcessOrder = async (orderId: string) => {
    try {
      const result: OrderDto = await handleProcessOrder(orderId);
      if (result) {
        Toast.notifySuccess("Process order #" + result.code + "successfully");
        setOrders((prevOrders) => {
          return prevOrders.map((order) =>
            order.id === result.id
              ? { ...order, status: OrderStatus.PROCESSING }
              : order
          );
        });
      }
    } catch (error) {
      console.error("Cannot process this order", error);
    }
  };

  const updateCompleteOrder = async (orderId: string) => {
    try {
      const result: OrderDto = await handleCompleteOrder(orderId);
      if (result) {
        Toast.notifySuccess("Complete order #" + result.code + "successfully");
        setOrders((prevOrders) => {
          return prevOrders.map((order) =>
            order.id === result.id
              ? { ...order, status: OrderStatus.COMPLETED }
              : order
          );
        });
      }
    } catch (error) {
      console.error("Cannot complete this order", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchOrders = async () => {
      try {
        const [newOrders, processOrders, cancelOrders, doneOrders] =
          await Promise.all([
            getOrderByStatus(
              OrderStatus.PENDING,
              0,
              100,
              new Date(2024, 7, 28),
              new Date(2024, 7, 30)
            ),
            getOrderByStatus(
              OrderStatus.PROCESSING,
              0,
              100,
              new Date(2024, 7, 28),
              new Date(2024, 7, 30)
            ),
            getOrderByStatus(
              OrderStatus.CANCELLED,
              0,
              100,
              new Date(2024, 7, 28),
              new Date(2024, 7, 30)
            ),
            getOrderByStatus(
              OrderStatus.COMPLETED,
              0,
              100,
              new Date(2024, 7, 28),
              new Date(2024, 7, 30)
            ),
          ]);
        setOrders([
          ...newOrders.content,
          ...processOrders.content,
          ...cancelOrders.content,
          ...doneOrders.content,
        ]);
      } catch (error) {
        console.error("Failed to load orders", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const renderOrders = (status: OrderStatus, colorName: string) => (
    <Paper
      elevation={2}
      className="bg-gray-100 p-4 mb-4 flex flex-col min-h-[650px]"
    >
      <div>
        <div className="flex items-center">
          <span className={`w-4 h-4 rounded-full ${colorName}`}></span>
          <span className={styles.title}>
            {status.toLowerCase().replace(/^./, status[0].toUpperCase())}
          </span>
          <span className="ml-2 inline-flex items-center justify-center w-6 h-6 text-sm font-semibold text-gray-900 bg-gray-300 rounded-full">
            {orders.filter((order) => order.status === status).length}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          {status === OrderStatus.CANCELLED && "This item has been canceled"}
          {status === OrderStatus.PENDING && "This item hasn't been started"}
          {status === OrderStatus.PROCESSING &&
            "This is actively being worked on"}
          {status === OrderStatus.COMPLETED && "This has been completed"}
        </p>

        <div className="flex-grow">
          {orders
            .filter((order) => order.status === status)
            .map((order: OrderDto) => (
              <OrderCard
                key={order.code}
                order={order}
                cancelOrder={updateCancelOrder}
                colorName={colorName}
                completeOrder={updateCompleteOrder}
                processOrder={updateProcessOrder}
              />
            ))}
        </div>
      </div>
    </Paper>
  );

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
      {loading ? (
        <div className="flex justify-center items-center mt-16">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <div className="mx-auto grid gap-3 xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-2">
            {renderOrders(OrderStatus.CANCELLED, "bg-red-400")}
            {renderOrders(OrderStatus.PENDING, "bg-yellow-400")}
            {renderOrders(OrderStatus.PROCESSING, "bg-green-400")}
            {renderOrders(OrderStatus.COMPLETED, "bg-blue-400")}
          </div>
        </div>
      )}
    </div>
  );
}
