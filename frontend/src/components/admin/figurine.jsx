import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import MUIDataTable from "mui-datatables";

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

/*
    All Figurines properties
    name, price, description, images, origin, classification, manufacturer, reviews
 */

// DataTable for Figurines
const columns = [
  { name: '_id', label: 'ID' },
  { name: 'name', label: 'Figure Name' },
  { name: 'price', label: 'Price' },
  { name: 'image', label: 'Image' },
  { name: 'origin', label: 'Origin' },
  { name: 'classification', label: 'Classification' },
];

const options = {
  filterType: 'checkbox',
  selectableRows: 'multiple',
  rowsPerPage: 5,
  rowsPerPageOptions: [5, 10, 15],
};

function DataTable({ rows }) {
    const data = rows.map(row => [
        row._id,
        row.name,
        row.price,
        row.image,
        row.origin,
        row.classification
    ]);

    return (
        <Paper sx={{ height: 400, width: '100%' }}>
            <MUIDataTable
                title={"Figurine List"}
                data={data}
                columns={columns}
                options={options}
            />
        </Paper>
    );
}

export default FigurineDashboard;