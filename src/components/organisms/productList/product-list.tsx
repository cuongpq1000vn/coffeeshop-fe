"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import style from "../style/product.module.css";
import { Alert, IconButton, Avatar } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ProductModal, Table, TableTab } from "@/components/molecules";
import { TableProps } from "@/types/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { PageDTO } from "@/types/Page";
import { ProductDTO } from "@/types/dtos/categoryProduct/Product";
import { createProduct, getAllProduct } from "@/services/ProductService";
import { TableTabProps } from "@/types/TableTab";
import { convertToCSV, downloadCSV } from "@/util/convertCsv";
import { ProductRequest } from "@/types/dtos/categoryProduct/request/ProductRequest";

const url = process.env.NEXT_PUBLIC_API_URL;
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
  { field: "Name", headerName: "Name", width: 300 },
  {
    field: "Category",
    headerName: "Category",
    sortable: false,
    width: 300,
  },
  {
    field: "Description",
    headerName: "Description",
    sortable: false,
    width: 300,
  },
  {
    field: "Price",
    headerName: "Price",
    sortable: true,
    width: 300,
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
  const MAX_VALUE = 1000000;
  const [productProps, setProductProps] = useState<TableProps | null>(null);
  const [tableTab, setTableTab] = useState<TableTabProps | null>(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 0,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const exportData = async () => {
    try {
      const result: PageDTO<ProductDTO> = await getAllProduct(0, MAX_VALUE);
      if (!result) {
        console.error("Unexpected data format:", result);
      }

      const csvData = result.content.map((product) => ({
        id: product.id,
        image: product.imgs[0] || "",
        Name: product.name,
        Description: product.shortDescription,
        status: product.live ? "Active" : "Inactive",
        Price: product.price,
        Category: product.category ? "Hot Coffee" : "Ice Coffee",
      }));
      const csv = convertToCSV(csvData);
      downloadCSV(csv, "products.csv");
    } catch (error) {
      console.error("Failed to download:", error);
    }
  };
  const handlePaginationModelChange = (newPaginationModel: any) => {
    setPaginationModel(newPaginationModel);
  };
  const handleCreateProduct = async (product: ProductRequest) => {
    try {
      const productDTO: ProductDTO = await createProduct(product);
      if (!productDTO) {
        console.error("Unexpected data format:", productDTO);
      }
    } catch (error) {
      console.error("Failed to create:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const result: PageDTO<ProductDTO> = await getAllProduct(
        paginationModel.page,
        paginationModel.pageSize
      );
      const category: TableProps = {
        columns: columnsTable,
        rows: result.content.map((product) => ({
          id: product.id,
          image: url + product.imgs[0] || "",
          Name: product.name,
          Description: product.shortDescription,
          status: product.live ? "Active" : "Inactive",
          Price: product.price,
          Category: product.category ? "Hot Coffee" : "Ice Coffee",
        })),
        pageSize: result.pageable.pageSize,
        pageNumber: result.pageable.pageNumber,
        totalElements: result.totalElements,
        totalPages: result.totalPages,
      };
      setProductProps(category);
      const tableTab: TableTabProps = {
        total: result.content.length,
        active: result.content.filter((product) => product.live).length,
        inActive: result.content.filter((product) => !product.live).length,
        type: "products",
      };
      setTableTab(tableTab);
    };
    fetchData();
  }, [paginationModel]);

  return (
    <div>
      <div className={style.head}>
        <div className={style.column}>
          <h1 className="font-bold text-3xl font-mono leading-10">Products</h1>
        </div>
        <div className={style.column}>
          <button className={style.export} onClick={exportData}>
            <FontAwesomeIcon
              icon={faArrowUpFromBracket}
              className={style.icons}
            />
            Export
          </button>
          <button
            className={style.createCategory}
            onClick={() => setModalOpen(true)}
          >
            + Create Product
          </button>
        </div>
      </div>
      <div className={style.bottom}>
        {tableTab && <TableTab {...tableTab} />}
        {productProps && (
          <Table
            table={productProps}
            handleChange={handlePaginationModelChange}
          />
        )}
        <Alert severity="info" className={style.alert}>
          <a href="url" className={style.word}>
            Learn more about Product
          </a>
        </Alert>
      </div>
      <ProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateProduct}
      />
    </div>
  );
}
