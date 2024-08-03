"use client";
import React from "react";
import { DataGrid, GridRowHeightParams } from "@mui/x-data-grid";
import style from "../style/table.module.css";
import { TableProps } from "@/types/Table";

type TableHandleProps = {
  table: TableProps;
  handleChange: (newPaginationModel: any) => void;
};

export default function Table({
  table,
  handleChange,
}: Readonly<TableHandleProps>) {
  const paginationModel = {
    page: table.pageNumber,
    pageSize: table.pageSize,
  };

  return (
    <div className={style.table}>
      <DataGrid
        rows={table.rows}
        columns={table.columns}
        paginationModel={paginationModel}
        pageSizeOptions={[5, 20, 50, 100]}
        onPaginationModelChange={handleChange}
        pagination
        paginationMode="server"
        rowCount={table.totalElements}
        initialState={{
          pagination: {
            paginationModel: paginationModel,
          },
        }}
        getRowHeight={({ id, densityFactor }: GridRowHeightParams) => {
          return 70 * densityFactor;
        }}
        checkboxSelection
        autoHeight
      />
    </div>
  );
}
