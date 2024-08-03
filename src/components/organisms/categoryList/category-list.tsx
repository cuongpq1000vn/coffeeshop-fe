"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import style from "../style/category.module.css";
import { Alert, IconButton, Avatar } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CategoryModal, Table, TableTab } from "@/components/molecules";
import { TableProps } from "@/types/Table";
import { createCategory, getAllCategory } from "@/services/CategoryService";
import { useEffect, useState } from "react";
import { CategoryDTO } from "@/types/dtos/categoryProduct/Category";
import { TableTabProps } from "@/types/TableTab";
import { PageDTO } from "@/types/Page";
import { CategoryRequest } from "@/types/dtos/categoryProduct/request/CategoryRequest";

const columnsTable: GridColDef[] = [
  {
    field: "image",
    headerName: "Categories",
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
  const [categoryProps, setCategoryProps] = useState<TableProps | null>(null);
  const [tableTab, setTableTab] = useState<TableTabProps | null>(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 0,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const handlePaginationModelChange = (newPaginationModel: any) => {
    setPaginationModel(newPaginationModel);
  };
  const handleCreateCategory = async (category: CategoryRequest) => {
    try {
      const categoryDTO: CategoryDTO = await createCategory(category);
      if (!categoryDTO) {
        console.error("Unexpected data format:", categoryDTO);
      }
    } catch (error) {
      console.error("Failed to create:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: PageDTO<CategoryDTO> = await getAllCategory(
          paginationModel.page,
          paginationModel.pageSize
        );
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
          pageSize: result.pageable.pageSize,
          pageNumber: result.pageable.pageNumber,
          totalElements: result.totalElements,
          totalPages: result.totalPages,
        };

        setCategoryProps(categoryValue);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchData();
  }, [paginationModel]);

  return (
    <div>
      <div className={style.head}>
        <div className={style.column}>
          <h1 className="font-bold text-3xl font-mono leading-10">
            Categories
          </h1>
        </div>

        <div className={style.column}>
          <button
            className={style.createCategory}
            onClick={() => setModalOpen(true)}
          >
            + Create Categories
          </button>
        </div>
      </div>
      <div className={style.bottom}>
        {tableTab && <TableTab {...tableTab} />}
        {categoryProps && (
          <Table
            table={categoryProps}
            handleChange={handlePaginationModelChange}
          />
        )}
        <Alert severity="info" className={style.alert}>
          <a href="url" className={style.word}>
            Learn more about category
          </a>
        </Alert>
      </div>
      <CategoryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateCategory}
      />
    </div>
  );
}
