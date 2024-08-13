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

export default function OrderDetailCard() {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="mt-5 shadow-lg rounded-lg">
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div" fontWeight="bold">
            Order #12345
          </Typography>
          <Chip label="New Order" className="bg-yellow-500 text-white" />
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
          Placed on: August 12, 2024
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Table Name: 12
        </Typography>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" alignItems="center">
              <Image
                src="/images/Image.png"
                width={200}
                height={200}
                className="rounded-md"
                alt="Product"
              />
              <Box ml={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Product Name
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantity: 1
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Description: 
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Note:
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" color="text.secondary">
              Payment Method:
            </Typography>
            <Typography variant="body2">Credit Card ending in 1234</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" color="text.secondary">
              Order Total:
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              $99.99
            </Typography>
          </Box>
        </Collapse>
        
        <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
          <Button variant="contained" color="success">
            Accept
          </Button>
          <Button variant="outlined" color="error">
            Cancel
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
