import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import AdminSidebar from './adminsidebar';
import { useManufacturerStore } from '../store/zmanufacturer';

const ManufacturerDashboard = () => {
    // Fetching Manufacturers
    const { fetchManufacturers, manufacturers } = useManufacturerStore();

    useEffect(() => {
        const fetchManufacturerData = async () => {
            await fetchManufacturers();
        }
        fetchManufacturerData();
    }, [fetchManufacturers]);

    return (
        <div className="flex">
            <AdminSidebar />
            <Stack spacing={2} className="flex-1 p-5">
                <h1 className="font-delius text-3xl font-bold mb-4">Manufacturer Dashboard</h1>
                <DataTable rows={manufacturers} />
            </Stack>
        </div>
    );
}

// DataTable for Manufacturers
const columns = [
  { field: '_id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Manufacturer Name', width: 130 },
  { field: 'country', headerName: 'Country', width: 130 },
  { field: 'image', headerName: 'Image', width: 130 },
];

const paginationModel = { page: 0, pageSize: 5 };

function DataTable({ rows }) {
    return (
        <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row._id}  // Use _id as the unique identifier
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </Paper>
    );
}

export default ManufacturerDashboard;