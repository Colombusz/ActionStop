import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import AdminSidebar from './adminsidebar';
import { usePromoStore } from '../store/zpromo';

const PromoDashboard = () => {
    // Fetching Promos
    const { fetchPromos, promos } = usePromoStore();

    useEffect(() => {
        const fetchPromoData = async () => {
            await fetchPromos();
        }
        fetchPromoData();
    }, [fetchPromos]);

    return (
        <div className="flex">
             <div
                    style={{
                    position: "sticky",
                    top: 0,
                    height: "100vh", // Full viewport height
                    backgroundColor: "#f0f0f0", // Optional for visibility
                    flexShrink: 0, // Prevent shrinking
                    }}
                >
                    <AdminSidebar />
                </div>
            <Stack spacing={2} className="flex-1 p-5">
                <h1 className="font-delius text-3xl font-bold mb-4">Promo Dashboard</h1>
                <DataTable rows={promos} />
            </Stack>
        </div>
    );
}

// DataTable for Promos
const columns = [
  { field: '_id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Promo Name', width: 130 },
  { field: 'discount', headerName: 'Discount', width: 130 },
  { field: 'image', headerName: 'Image', width: 130 },
  { field: 'figurine', headerName: 'Figurine', width: 130 },
  { field: 'description', headerName: 'Description', width: 200 },
  { field: 'expiry', headerName: 'Expiry Date', width: 130 },
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

export default PromoDashboard;