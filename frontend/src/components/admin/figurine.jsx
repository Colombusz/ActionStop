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
        <div style={{ display: 'flex' }}>
            <AdminSidebar />
            <Stack spacing={2} style={{ flex: 1, padding: '20px' }}>
                <h1>Figurine Dashboard</h1>
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


// const rows = [
//     { id: 1, name: 'Dragon Slayer', price: '$120', image: 'dragon_slayer.jpg', origin: 'Japan', classification: 'Anime' },
//     { id: 2, name: 'Knight of Dawn', price: '$150', image: 'knight_of_dawn.jpg', origin: 'USA', classification: 'Fantasy' },
//     { id: 3, name: 'Cyber Ninja', price: '$90', image: 'cyber_ninja.jpg', origin: 'Korea', classification: 'Sci-Fi' },
//     { id: 4, name: 'Pirate Queen', price: '$130', image: 'pirate_queen.jpg', origin: 'Japan', classification: 'Adventure' },
//     { id: 5, name: 'Sorcerer Supreme', price: '$110', image: 'sorcerer_supreme.jpg', origin: 'France', classification: 'Magic' },
//     { id: 6, name: 'Mecha Titan', price: '$200', image: 'mecha_titan.jpg', origin: 'Japan', classification: 'Mecha' },
//     { id: 7, name: 'Space Warrior', price: '$80', image: 'space_warrior.jpg', origin: 'USA', classification: 'Sci-Fi' },
//     { id: 8, name: 'Desert Nomad', price: '$95', image: 'desert_nomad.jpg', origin: 'Middle East', classification: 'Adventure' },
//     { id: 9, name: 'Forest Elf', price: '$85', image: 'forest_elf.jpg', origin: 'Germany', classification: 'Fantasy' },
// ];
  




export default FigurineDashboard;