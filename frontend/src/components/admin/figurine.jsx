import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import MUIDataTable from "mui-datatables";

import AdminSidebar from './adminsidebar';
import { useFigurineStore } from '../store/zfigurine';
import {
  Modal,
  ModalTrigger,
  ModalBody,
  ModalContent,
  ModalFooter,
  useModal,
} from '../ui/animated-modal';
import FigurineModal from './figurineModal'; // Ensure this import is correct

export const FigurineDashboard = () => {
  // Fetching Figurines
  const { fetchFigurines, figurines } = useFigurineStore();
  const [selectedFigurine, setSelectedFigurine] = useState(null);
  const { setOpen } = useModal();


  useEffect(() => {
    const fetchfigurinedata = async () => {
      await fetchFigurines();
    };
    fetchfigurinedata();
  }, [fetchFigurines]);

  const handleRowButtonClick = (figurine) => {
    console.log("Figurine selected:", figurine);
    setSelectedFigurine(figurine);
    setOpen(true); 
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <Stack spacing={2} className="flex-1 p-5">
        <h1 className="font-delius text-3xl font-bold mb-4">Figurine Dashboard</h1>
        <DataTable
          rows={figurines}
          onRowButtonClick={handleRowButtonClick}
        />
        {selectedFigurine && (
          <FigurineModal
            figurine={selectedFigurine}
            onClose={() => setSelectedFigurine(null)}
          />
        )}
      </Stack>
    </div>
  );
};

/*
    All Figurines
    name, price, description, images, origin, classification, manufacturer, reviews
 */

const DataTable = ({ rows, onRowButtonClick }) => {
  const columns = [
    { name: '_id', label: 'ID' },
    { name: 'name', label: 'Figure Name' },
    { name: 'price', label: 'Price' },
    { name: 'origin', label: 'Origin' },
    { name: 'classification', label: 'Classification' },
    {
      name: 'actions',
      label: 'Actions',
      options: {
        customBodyRender: (_, tableMeta) => {
          const rowIndex = tableMeta.rowIndex;
          const figurine = rows[rowIndex];
          return (
            <div className=" text-white px-3 py-1 rounded flex items-center space-x-2">
            <button
                className="px-4 py-2 bg-zinc-900 text-white rounded hover:bg-zinc-600 transition"
                onClick={() => {
                onRowButtonClick(figurine);
                }}>
                Details
            </button>
            <button
                className="px-4 py-2 bg-zinc-900 text-white rounded hover:bg-zinc-600 transition"
                onClick={() => {
                onRowButtonClick(figurine);
                }}>
                Edit
            </button>
            </div>

          );
        },
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    selectableRows: 'none',
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15],
  };

  const data = rows.map((row) => ({
    _id: row._id,
    name: row.name,
    price: row.price,
    origin: row.origin,
    classification: row.classification,
    actions: null,
  }));

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
};

export default FigurineDashboard;