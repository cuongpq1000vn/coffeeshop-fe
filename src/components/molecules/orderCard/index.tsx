"use client";
import React, { useState } from "react";
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

type OrderProps = {
  order: OrderDto;
  cancelOrder: (orderId: string) => Promise<void>;
  colorName: string;
};
export default function OrderDetailCard({
  order,
  cancelOrder,
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

  return (
    <Card className="mt-5 shadow-lg rounded-lg">
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div" fontWeight="bold">
            Order #{order.code}
          </Typography>
          <Chip label={order.status} className={`${colorName} text-white`} />
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
        </Box>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Placed on: {order.createdAt}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Table Name: {order.tableName}
        </Typography>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {order.orderItems.map((orderItems: OrderItemDto) => (
            <Box key={orderItems.id}>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" alignItems="center">
                <Image
                  src={orderItems.img[0]}
                  width={200}
                  height={200}
                  className="rounded-md"
                  alt="Product"
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
              <Typography variant="h6" fontWeight="bold">
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

        <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
          <Button variant="contained" color="success">
            Accept
          </Button>
          <Button variant="outlined" color="error" onClick={handleCancelClick}>
            Cancel
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
