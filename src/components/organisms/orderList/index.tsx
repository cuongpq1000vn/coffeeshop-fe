"use client";

import React, { useState } from "react";
import styles from "../style/order.module.css";
import { IoSearch } from "react-icons/io5";
import { OrderCard } from "@/components/molecules";

export default function OrderList() {
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
          </div>

          <div>
            <div
              className={`${styles.headerContainer} flex items-center bg-yellow-500`}
            >
              <span className={styles.title}>New Orders</span>
            </div>
            <OrderCard />
          </div>
          <div>
            <div
              className={`${styles.headerContainer} flex items-center bg-neutral-800`}
            >
              <span className={styles.title}>In Progress</span>
            </div>
          </div>
          <div>
            <div
              className={`${styles.headerContainer} flex items-center bg-blue-500`}
            >
              <span className={styles.title}>Done</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
