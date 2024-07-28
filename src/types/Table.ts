import { GridColDef } from "@mui/x-data-grid";

export type TableProps = {
  columns: GridColDef[];
  rows: Object[];
  pageSize: number;
  pageNumber: number;
  totalElements: number;
  totalPages: number;
};
