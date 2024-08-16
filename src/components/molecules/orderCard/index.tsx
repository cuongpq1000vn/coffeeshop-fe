"use client";
import React, { memo, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Collapse,
  Box,
  Divider,
  Chip,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import { OrderDto, OrderItemDto } from "@/types/dtos/order/OrderDto";
import { MdDelete } from "react-icons/md";
import { IoSendOutline } from "react-icons/io5";
import { OrderStatus } from "@/types/OrderStatus";
import { MdOutlineDone } from "react-icons/md";

const url = process.env.NEXT_PUBLIC_API_URL;
type OrderProps = {
  order: OrderDto;
  cancelOrder: (orderId: string) => Promise<void>;
  completeOrder: (orderId: string) => Promise<void>;
  processOrder: (orderId: string) => Promise<void>;
  colorName: string;
};
export default memo(function OrderDetailCard({
  order,
  cancelOrder,
  completeOrder,
  processOrder,
  colorName,
}: OrderProps) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCancelClick = async () => {
    try {
      await cancelOrder(order.id);
      console.log("Order cancelled successfully");
    } catch (error) {
      console.error("Failed to cancel order", error);
    }
  };

  const handleCompleteClick = async () => {
    try {
      await completeOrder(order.id);
      console.log("Order completed successfully");
    } catch (error) {
      console.error("Failed to complete order", error);
    }
  };

  const handleProcessClick = async () => {
    try {
      await processOrder(order.id);
      console.log("Order processed successfully");
    } catch (error) {
      console.error("Failed to process order", error);
    }
  };

  const formatDate = (dateString: number) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 19).replace("T", " ");
  };

  return (
    <Card className="mt-5 shadow-lg rounded-lg">
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" component="div" fontWeight="bold">
            Order #{order.code}
          </Typography>
          <div>
            <IconButton
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
              sx={{
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s",
              }}
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </Box>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Placed on: {formatDate(order.createdAt)}
        </Typography>
        <div className="flex items-center space-x-2">
          <Typography variant="body2" color="text.secondary">
            Table Name: {order.tableName}
          </Typography>
          <Chip
            label={order.status}
            className={`${colorName} text-white font-bold`}
          />
        </div>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {order.orderItems.map((orderItems: OrderItemDto) => (
            <Box key={orderItems.id}>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" alignItems="center">
                <Image
                  src={url + orderItems.img[0]}
                  width={200}
                  height={200}
                  className="rounded-md"
                  alt="Product"
                  loading="lazy"
                />
                <Box ml={2}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {orderItems.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantity: {orderItems.qty}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Description: {orderItems.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Note: {orderItems.note}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" color="text.secondary">
                Price:
              </Typography>
              <Typography variant="body2">
                {orderItems.price} {orderItems.currency}
              </Typography>
            </Box>
          ))}
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2" color="text.secondary">
            Payment Method:
          </Typography>
          <Typography variant="body2">{order.paymentType}</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2" color="text.secondary">
            Total:
          </Typography>
          <Typography variant="body2">
            {order.grandTotal} {order.currency}
          </Typography>
        </Collapse>

        {order.status === OrderStatus.COMPLETED ||
          (order.status === OrderStatus.CANCELLED && <></>)}

        {order.status === OrderStatus.PROCESSING && (
          <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
            <button
              className="py-1.5 px-5 me-2 text-sm font-medium bg-white border border-black text-gray-900 hover:bg-gray-100 rounded-lg text-center flex items-center"
              onClick={handleCompleteClick}
            >
              Completed <MdOutlineDone className="ml-1" />
            </button>
          </Box>
        )}

        {order.status === OrderStatus.PENDING && (
          <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
            <button
              className="py-1.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-black hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
            <button
              className="py-1.5 px-5 me-2 text-sm font-medium text-white bg-black rounded-lg border border-black hover:bg-gray-800"
              onClick={handleProcessClick}
            >
              Accept
            </button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
});
