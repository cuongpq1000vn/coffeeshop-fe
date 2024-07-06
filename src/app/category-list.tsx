"use client"
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import style from "./style/category.module.css";
import { Alert,Box, colors, Tab, Tabs } from '@mui/material';
import { Avatar } from '@mui/material'; 
const columns: GridColDef[] = [
  { field: 'image', headerName: 'Product', width: 120, renderCell: (params) => <Avatar alt={params.row.Name} src={params.value} className={style.image}/> },
  { field: 'Name', headerName: 'Name', width: 500 },
  { field: 'Description', headerName: 'Description', sortable:false,width: 550 },
  { field: 'status', headerName: 'Status', width: 200,renderCell: ({ value }) => {
    let statusColor;
    switch (value) {
      case 'Active':
        statusColor = 'green';
        break;
      case 'Inactive':
        statusColor = 'red';
        break;
      default:
        statusColor = 'black'; 
    }
    return <span style={{ color: statusColor }}>{value}</span>;
  },
},
];
const rows = [
  { id: 1, image: "https://th.bing.com/th/id/OIP.iztlpqBdMWRs23FizYdZmAHaE7?rs=1&pid=ImgDetMain", Name: 'Coffee', Description: "Very Hot Drinks", status: "Active" },
  {id: 2, image: "https://th.bing.com/th/id/OIP.iztlpqBdMWRs23FizYdZmAHaE7?rs=1&pid=ImgDetMain", Name: 'Coffee', Description:"Very Hot Drinks", status:"Active" },
  {id: 3, image: "https://th.bing.com/th/id/OIP.iztlpqBdMWRs23FizYdZmAHaE7?rs=1&pid=ImgDetMain", Name: 'Coffee', Description:"Very Hot Drinks", status:"Inactive"},
  {id: 4, image: "https://th.bing.com/th/id/OIP.iztlpqBdMWRs23FizYdZmAHaE7?rs=1&pid=ImgDetMain", Name: 'Coffee', Description:"Very Hot Drinks", status:"Inactive"},
  {id: 5, image: "https://th.bing.com/th/id/OIP.iztlpqBdMWRs23FizYdZmAHaE7?rs=1&pid=ImgDetMain", Name: 'Coffee', Description:"Very Hot Drinks", status:"Draft"},
  {id: 6, image: "https://th.bing.com/th/id/OIP.iztlpqBdMWRs23FizYdZmAHaE7?rs=1&pid=ImgDetMain", Name: 'Coffee', Description:"Very Hot Drinks", status:"Active"},
  {id: 7, image: "https://th.bing.com/th/id/OIP.iztlpqBdMWRs23FizYdZmAHaE7?rs=1&pid=ImgDetMain", Name: 'Coffee', Description:"Very Hot Drinks", status:"Active"},
];

export default function DataTable() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  const getRowHeight = (params) => {
      // Adjust the logic here based on your needs
      // You can access the row data using params.row
    if (params.row.image.heig> 50) { // Example: Increase height for rows with long descriptions
      return 80; // Set a desired height (in pixels)
    } else {
      return 60; // Default height (in pixels)
    }
    };
  };
  return (
    <div className={style.all}>
      <div className={style.head}>
        <div className={style.column}><h1>Categories</h1></div>
      
        <div className={style.column}><button className={style.button}>+ Create Categories</button></div>
      </div>
      <div className={style.bottom}>
        <div className={style.box}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="All Categories (20)"/>
            <Tab label="Active (10)" />
            <Tab label="Draft (5)" />
            <Tab label="Inactive (5)" />
            </Tabs>
          </Box>
        </div>
      <div className={style.table}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 6},
            },
          }}
          checkboxSelection
        />
      </div>
        <Alert severity="info" className={style.alert}>Learn more about category</Alert>
      </div>
    </div>
  );
}