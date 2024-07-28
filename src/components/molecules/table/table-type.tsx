import { DataGrid, GridRowHeightParams } from "@mui/x-data-grid";
import style from "../style/table.module.css";
import { TableProps } from "@/types/Table";
export default function Table(tableProps: TableProps) {
  return (
    <div className={style.table}>
      <DataGrid
        rows={tableProps.rows}
        columns={tableProps.columns}
        initialState={{
          pagination: {
            paginationModel: { page: tableProps.pageNumber, pageSize: tableProps.pageSize },
          },
        }}
        getRowHeight={({ id, densityFactor }: GridRowHeightParams) => {
          return 70 * densityFactor;
        }}
        checkboxSelection
      />
    </div>
  );
}
