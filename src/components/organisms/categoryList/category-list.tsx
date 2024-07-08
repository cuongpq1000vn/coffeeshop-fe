"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import style from "../style/category.module.css";
import { Alert, Box, IconButton, Tab, Tabs, Avatar } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Table } from "@/components/molecules";
import { CategoryProps } from "@/types/CategoryTable";
import { TableProps } from "@/types/Table";
const columnsTable: GridColDef[] = [
  {
    field: "image",
    headerName: "Product",
    width: 120,
    sortable: false,
    renderCell: (params) => (
      <Avatar
        alt={params.row.Name}
        src={params.value}
        className={style.image}
      />
    ),
  },
  { field: "Name", headerName: "Name", width: 500 },
  {
    field: "Description",
    headerName: "Description",
    sortable: false,
    width: 550,
  },
  {
    field: "status",
    headerName: "Status",
    width: 190,
    renderCell: ({ value }) => {
      let statusColor;
      switch (value) {
        case "Active":
          statusColor = "green";
          break;
        case "Inactive":
          statusColor = "red";
          break;
        default:
          statusColor = "grey";
      }
      return <span style={{ color: statusColor }}>{value}</span>;
    },
  },
  {
    field: "action",
    headerName: "",
    width: 0.5,
    sortable: false,
    renderCell: (params) => (
      <IconButton aria-label="move">
        <MoreVertIcon />
      </IconButton>
    ),
  },
];

const category: CategoryProps[] = [
  {
    id: 1,
    image:
      "https://th.bing.com/th/id/OIP.iztlpqBdMWRs23FizYdZmAHaE7?rs=1&pid=ImgDetMain",
    Name: "Coffee",
    Description: "Very Hot Drinks",
    status: "Active",
  },
  {
    id: 2,
    image:
      "https://th.bing.com/th/id/OIP.iztlpqBdMWRs23FizYdZmAHaE7?rs=1&pid=ImgDetMain",
    Name: "Coffee",
    Description: "Very Hot Drinks",
    status: "Active",
  },
  {
    id: 3,
    image:
      "https://th.bing.com/th/id/OIP.iztlpqBdMWRs23FizYdZmAHaE7?rs=1&pid=ImgDetMain",
    Name: "Coffee",
    Description: "Very Hot Drinks",
    status: "Inactive",
  },
  {
    id: 4,
    image:
      "https://th.bing.com/th/id/OIP.iztlpqBdMWRs23FizYdZmAHaE7?rs=1&pid=ImgDetMain",
    Name: "Coffee",
    Description: "Very Hot Drinks",
    status: "Inactive",
  },
  {
    id: 5,
    image:
      "https://th.bing.com/th/id/OIP.iztlpqBdMWRs23FizYdZmAHaE7?rs=1&pid=ImgDetMain",
    Name: "Coffee",
    Description: "Very Hot Drinks",
    status: "Draft",
  },
  {
    id: 6,
    image:
      "https://th.bing.com/th/id/OIP.iztlpqBdMWRs23FizYdZmAHaE7?rs=1&pid=ImgDetMain",
    Name: "Coffee",
    Description: "Very Hot Drinks",
    status: "Active",
  },
  {
    id: 7,
    image:
      "https://th.bing.com/th/id/OIP.iztlpqBdMWRs23FizYdZmAHaE7?rs=1&pid=ImgDetMain",
    Name: "Coffee",
    Description: "Very Hot Drinks",
    status: "Active",
  },
];
const categoryProps: TableProps = {
  columns: columnsTable,
  rows: category,
};
export default function DataTable() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className={style.all}>
      <div className={style.head}>
        <div className={style.column}>
          <h1>Categories</h1>
        </div>

        <div className={style.column}>
          <button className={style.createCategory}>+ Create Categories</button>
        </div>
      </div>
      <div className={style.bottom}>
        <div className={style.tableTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="All Categories (20)" />
              <Tab label="Active (10)" />
              <Tab label="Draft (5)" />
              <Tab label="Inactive (5)" />
            </Tabs>
          </Box>
        </div>
        <Table {...categoryProps} />
        <Alert severity="info" className={style.alert}>
          <a href="url" className={style.word}>
            Learn more about category
          </a>
        </Alert>
      </div>
    </div>
  );
}
