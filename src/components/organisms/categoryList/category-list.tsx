"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import style from "../style/category.module.css";
import { Alert, IconButton, Avatar } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Table, TableTab } from "@/components/molecules";
import { TableProps } from "@/types/Table";
import { getAllCategory } from "@/services/CategoryService";
import { useAppContext } from "@/context/AppProvider";
import { useEffect, useState } from "react";
import { CategoryDTO } from "@/types/dtos/categoryProduct/Category";
import { TableTabProps } from "@/types/TableTab";

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

export default function DataTable() {
  const { sessionToken } = useAppContext();
  const [categoryProps, setCategoryProps] = useState<TableProps | null>(null);
  const [tableTab, setTableTab] = useState<TableTabProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: CategoryDTO[] = await getAllCategory(sessionToken);
        if (!Array.isArray(result)) {
          console.error("Unexpected data format:", result);
          return;
        }

        const tableTab: TableTabProps = {
          total: result.length,
          active: result.filter((category) => !category.isDeleted).length,
          inActive: result.filter((category) => category.isDeleted).length,
          type: "categories",
        };

        setTableTab(tableTab);

        const categoryValue: TableProps = {
          columns: columnsTable,
          rows: result.map((category) => ({
            id: category.id,
            Name: category.name,
            Description: category.normalizedName,
            status: category.isDeleted ? "Inactive" : "Active",
            image: category.images[0] || "",
            action: "",
          })),
          pageSize: 5,
          pageNumber: 0,
          totalElements: result.length,
          totalPages: Math.ceil(result.length / 5),
        };

        setCategoryProps(categoryValue);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchData();
  }, [sessionToken]);

  return (
    <div className={style.all}>
      <div className={style.head}>
        <div className={style.column}>
          <h1 className="font-bold">Categories</h1>
        </div>

        <div className={style.column}>
          <button className={style.createCategory}>+ Create Categories</button>
        </div>
      </div>
      <div className={style.bottom}>
        {tableTab && <TableTab {...tableTab} />}
        {categoryProps && <Table {...categoryProps} />}
        <Alert severity="info" className={style.alert}>
          <a href="url" className={style.word}>
            Learn more about category
          </a>
        </Alert>
      </div>
    </div>
  );
}
