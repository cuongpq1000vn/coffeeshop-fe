"use client";
import * as React from "react";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import style from "../style/product.module.css";
import { Alert, Avatar } from "@mui/material";
import { ProductModal, Table, TableTab } from "@/components/molecules";
import { TableProps } from "@/types/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useMemo, useState } from "react";
import { PageDTO } from "@/types/Page";
import { ProductDTO } from "@/types/dtos/categoryProduct/Product";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
} from "@/services/ProductService";
import { TableTabProps } from "@/types/TableTab";
import { convertToCSV, downloadCSV } from "@/util/convertCsv";
import { ProductRequest } from "@/types/dtos/categoryProduct/request/ProductRequest";
import { MdOutlineDelete } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";

const url = process.env.NEXT_PUBLIC_API_URL;

export default function DataTable() {
  const MAX_VALUE = 1000000;
  const [productProps, setProductProps] = useState<TableProps | null>(null);
  const [tableTab, setTableTab] = useState<TableTabProps | null>(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 0,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState<ProductRequest>({
    name: "",
    price: 0,
    live: false,
    countSale: 0,
    finalPrice: 0,
    longDescription: "",
    shortDescription: "",
    images: [],
    storeId: "",
    category: 0,
    note: "",
    recommended: false,
    discountFrom: new Date(),
    discountTo: new Date(),
    discountAmount: 0,
    discountPercent: 0,
  });

  const deleteItem = React.useCallback(
    (id: string) => async () => {
      const result = await deleteProduct(id);
      if (!result) {
        console.error("Unexpected data format:", result);
      }
      window.location.reload();
    },
    []
  );

  const editProduct = React.useCallback(
    (product: ProductRequest, productId: string) => () => {
      if (product) {
        setProduct({
          name: product.name,
          price: product.price,
          live: product.live,
          countSale: product.countSale,
          finalPrice: product.finalPrice,
          longDescription: product.longDescription,
          shortDescription: product.shortDescription,
          images: product.images,
          storeId: product.storeId,
          category: product.category,
          note: product.note,
          recommended: product.recommended,
          discountFrom: product.discountFrom,
          discountTo: product.discountTo,
          discountAmount: product.discountAmount,
          discountPercent: product.discountPercent,
        });
        setProductId(productId);
        setEditMode(true);
        setModalOpen(true);
      }
    },
    []
  );

  const handleEditProduct = async (updatedProduct: ProductRequest) => {
    try {
      const productDTO: ProductDTO = await updateProduct(
        productId,
        updatedProduct
      );
      if (!productDTO) {
        console.error("Unexpected data format:", productDTO);
      }
      setModalOpen(false);
      setEditMode(false);
      window.location.reload();
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  const columnsTable: GridColDef[] = useMemo<GridColDef[]>(
    () => [
      {
        field: "image",
        headerName: "Product",
        sortable: false,
        renderCell: (params) => (
          <Avatar
            alt={params.row.Name}
            src={params.value}
            className={style.image}
          />
        ),
      },
      { field: "name", headerName: "Name", width: 300 },
      { field: "id", headerName: "Id" },
      {
        field: "category",
        headerName: "Category",
        sortable: false,
      },
      {
        field: "countSale",
        headerName: "Count Sale",
        sortable: false,
      },
      {
        field: "longDescription",
        headerName: "Long Description",
        sortable: false,
      },
      {
        field: "shortDescription",
        headerName: "Short Description",
        sortable: false,
      },
      {
        field: "note",
        headerName: "Note",
        sortable: false,
      },
      {
        field: "recommended",
        headerName: "Recommended",
        sortable: false,
        renderCell: ({ value }) => {
          return (
            <span style={{ color: value ? "green" : "red" }}>
              {value ? "Yes" : "No"}
            </span>
          );
        },
      },
      {
        field: "live",
        headerName: "Live",
        sortable: true,
        renderCell: ({ value }) => {
          return (
            <span style={{ color: value ? "green" : "red" }}>
              {value ? "Active" : "Inactive"}
            </span>
          );
        },
      },
      {
        field: "price",
        headerName: "Price",
        sortable: true,
      },
      {
        field: "finalPrice",
        headerName: "Final Price",
        sortable: true,
      },
      {
        field: "discountFrom",
        headerName: "Discount From",
        sortable: true,
      },
      {
        field: "discountTo",
        headerName: "Discount To",
        sortable: true,
      },
      {
        field: "discountAmount",
        headerName: "Discount Amount",
        sortable: true,
      },
      {
        field: "discountPercent",
        headerName: "Discount Percent",
        sortable: true,
      },
      {
        field: "action",
        type: "actions",
        width: 80,
        getActions: (params: any) => [
          <GridActionsCellItem
            icon={<MdOutlineDelete className="text-lg" />}
            label="Delete"
            key={params.id}
            onClick={deleteItem(params.id)}
          />,
          <GridActionsCellItem
            icon={<RiEdit2Line />}
            label="Edit Product"
            key={params.id}
            onClick={editProduct(
              {
                name: params.row.name,
                price: params.row.price,
                live: params.row.live,
                countSale: params.row.countSale,
                finalPrice: params.row.finalPrice,
                longDescription: params.row.longDescription,
                shortDescription: params.row.shortDescription,
                images: [params.row.image || ""],
                storeId: params.row.storeId,
                category: params.row.category,
                note: params.row.note,
                recommended: params.row.recommended,
                discountFrom: params.row.discountFrom,
                discountTo: params.row.discountTo,
                discountAmount: params.row.discountAmount,
                discountPercent: params.row.discountPercent,
              },
              params.row.id
            )}
            showInMenu
          />,
        ],
      },
    ],
    [deleteItem, editProduct]
  );

  const exportData = async () => {
    try {
      const result: PageDTO<ProductDTO> = await getAllProduct(0, MAX_VALUE);
      if (!result) {
        console.error("Unexpected data format:", result);
      }
      const csvData = result.content.map((product) => ({
        id: product.id,
        image: product.imgs[0] || "",
        name: product.name,
        longDescription: product.longDescription,
        shortDescription: product.shortDescription,
        countSale: product.countSale,
        category: product.category,
        finalPrice: product.finalPrice,
        price: product.price,
        discountFrom: product.discountFrom,
        discountTo: product.discountTo,
        discountAmount: product.discountAmount,
        discountPercent: product.discountPercent,
        live: product.live,
        recommended: product.recommend,
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
          image: product.imgs[0] || "",
          name: product.name,
          longDescription: product.longDescription,
          shortDescription: product.shortDescription,
          countSale: product.countSale,
          category: product.category,
          finalPrice: product.finalPrice,
          status: product.live ? "Active" : "Inactive",
          price: product.price,
          discountFrom: product.discountFrom,
          discountTo: product.discountTo,
          discountAmount: product.discountAmount,
          discountPercent: product.discountPercent,
          live: product.live,
          recommended: product.recommend,
          note: product.note,
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
            onClick={() => {
              setModalOpen(true);
              setEditMode(false);
              setProduct({
                name: "",
                price: 0,
                live: false,
                countSale: 0,
                finalPrice: 0,
                longDescription: "",
                shortDescription: "",
                images: [],
                storeId: "",
                category: 0,
                note: "",
                recommended: false,
                discountFrom: new Date(),
                discountTo: new Date(),
                discountAmount: 0,
                discountPercent: 0,
              });
            }}
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
        onSubmit={editMode ? handleEditProduct : handleCreateProduct}
        isEditMode={editMode}
        initialProduct={product}
      />
    </div>
  );
}
