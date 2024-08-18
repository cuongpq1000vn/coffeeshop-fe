"use client";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import style from "../style/tableTab.module.css";
import Tab from "@mui/material/Tab";
import { TableTabProps } from "@/types/TableTab";

export default function TableTab(tableTabProps: Readonly<TableTabProps>) {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className={style.tableTab}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label={`All ${tableTabProps.type} (${tableTabProps.total})`} />
          <Tab label={`Active (${tableTabProps.active})`} />
          <Tab label={`Inactive (${tableTabProps.inActive})`} />
        </Tabs>
      </Box>
    </div>
  );
}
