"use client";
import * as React from "react";
import { GridActionsCellItem, GridColDef, GridRowId } from "@mui/x-data-grid";
import style from "../style/category.module.css";
import { Alert, Avatar } from "@mui/material";
import { CategoryModal, Table, TableTab } from "@/components/molecules";
import { TableProps } from "@/types/Table";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "@/services/CategoryService";
import { useEffect, useMemo, useState } from "react";
import { CategoryDTO } from "@/types/dtos/categoryProduct/Category";
import { TableTabProps } from "@/types/TableTab";
import { PageDTO } from "@/types/Page";
import { CategoryRequest } from "@/types/dtos/categoryProduct/request/CategoryRequest";
import { MdOutlineDelete } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";

export default function DataTable() {
  const [categoryProps, setCategoryProps] = useState<TableProps | null>(null);
  const [tableTab, setTableTab] = useState<TableTabProps | null>(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 0,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [category, setCategory] = useState<CategoryRequest>({
    name: "",
    parent: 0,
    storeId: "",
    images: [],
  });

  const handlePaginationModelChange = (newPaginationModel: any) => {
    setPaginationModel(newPaginationModel);
  };

  const deleteItem = React.useCallback(
    (id: number) => async () => {
      const result = await deleteCategory(id);
      if (!result) {
        console.error("Unexpected data format:", result);
      }
      window.location.reload();
    },
    []
  );

  const editCat = React.useCallback(
    (category: CategoryRequest, categoryId: number) => async () => {
      if (category) {
        setCategory({
          name: category.name,
          parent: category.parent,
          storeId: category.storeId,
          images: category.images,
        });
        setCategoryId(categoryId);
        setEditMode(true);
        setModalOpen(true);
      }
    },
    []
  );

  const columnsTable: GridColDef[] = useMemo<GridColDef[]>(
    () => [
      {
        field: "image",
        headerName: "Categories",
        sortable: false,
        renderCell: (params) => (
          <Avatar
            alt={params.row.Name}
            src={params.value}
            className={style.image}
          />
        ),
      },
      { field: "name", headerName: "Name" },
      { field: "id", headerName: "Id" },
      { field: "parent", headerName: "Parent Category" },
      {
        field: "slug",
        headerName: "Category Slug",
        sortable: false,
      },
      {
        field: "status",
        headerName: "Status",
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
        type: "actions",
        getActions: (params: any) => [
          <GridActionsCellItem
            icon={<MdOutlineDelete className="text-lg" />}
            label="Delete"
            key={params.id}
            onClick={deleteItem(params.id)}
          />,
          <GridActionsCellItem
            icon={<RiEdit2Line />}
            label="Edit Category"
            key={params.id}
            onClick={editCat(
              {
                name: params.row.name,
                parent: params.row.parent || 0,
                storeId: "store-id",
                images: [params.row.image || ""],
              },
              params.row.id
            )}
            showInMenu
          />,
        ],
      },
    ],
    [deleteItem, editCat]
  );
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

  const handleEditCategory = async (updatedCategory: CategoryRequest) => {
    try {
      const categoryDTO: CategoryDTO = await updateCategory(
        categoryId,
        updatedCategory
      );
      if (!categoryDTO) {
        console.error("Unexpected data format:", categoryDTO);
      }
      setModalOpen(false);
      setEditMode(false);
      window.location.reload();
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: PageDTO<CategoryDTO> = await getAllCategory(
          paginationModel.page,
          paginationModel.pageSize
        );

        const tableTab: TableTabProps = {
          total: result.content.length,
          active: result.content.filter((category) => !category.isDeleted)
            .length,
          inActive: result.content.filter((category) => category.isDeleted)
            .length,
          type: "categories",
        };

        setTableTab(tableTab);

        const categoryValue: TableProps = {
          columns: columnsTable,
          rows: result.content.map((category: CategoryDTO) => ({
            id: category.id,
            name: category.name,
            parent: category.parent,
            slug: category.normalizedName,
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
            onClick={() => {
              setModalOpen(true);
              setEditMode(false);
              setCategory({
                name: "",
                parent: 0,
                storeId: "",
                images: [],
              });
            }}
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
        onSubmit={editMode ? handleEditCategory : handleCreateCategory}
        isEditMode={editMode}
        initialCategory={category}
      />
    </div>
  );
}
