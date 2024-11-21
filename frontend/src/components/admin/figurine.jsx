import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import AdminSidebar from './adminsidebar';
import { useFigurineStore } from '../store/zfigurine';

const FigurineDashboard = () => {
    // Fetching Figurines
    const { fetchFigurines, figurines } = useFigurineStore();

    useEffect(() => {
        const fetchfigurinedata = async () => {
            await fetchFigurines();
        }
        fetchfigurinedata();
    }, [fetchFigurines]);

    return (
        <div className="flex">
            <AdminSidebar />
            <Stack spacing={2} className="flex-1 p-5">
                <h1 className="font-delius text-3xl font-bold mb-4">Figurine Dashboard</h1>
                <DataTable rows={figurines} />
            </Stack>
        </div>
    );
}

// DataTable for Figurines
const columns = [
  { field: '_id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Figure Name', width: 130 },
  { field: 'price', headerName: 'Price', width: 130 },
  { field: 'image', headerName: 'Image', width: 130 },
  { field: 'origin', headerName: 'Origin', width: 130 },
  { field: 'classification', headerName: 'Classification', width: 130 },
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


export default FigurineDashboard;