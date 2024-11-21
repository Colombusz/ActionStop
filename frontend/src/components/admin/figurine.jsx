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
import FigurineModal from './figurineModal';
import FigurineEditModal from './figurineEditModal';

export const FigurineDashboard = () => {
  const { fetchFigurines, figurines } = useFigurineStore();
  const [selectedFigurine, setSelectedFigurine] = useState(null);
  const [selectedFigurineForEdit, setSelectedFigurineForEdit] = useState(null);
  const { setOpen } = useModal();

  useEffect(() => {
    const fetchfigurinedata = async () => {
      await fetchFigurines();
    };
    fetchfigurinedata();
  }, [fetchFigurines]);

  const handleDetailsClick = (figurine) => {
    console.log("Viewing details for:", figurine);
    setSelectedFigurine(figurine);
    setOpen(true); // Open the Details Modal
  };

  const handleEditClick = (figurine) => {
    console.log("Editing figurine:", figurine);
    setSelectedFigurineForEdit(figurine);
    setOpen(true); // Open the Edit Modal
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <Stack spacing={2} className="flex-1 p-5">
        <h1 className="font-delius text-3xl font-bold mb-4">Figurine Dashboard</h1>
        <DataTable
          rows={figurines}
          onDetailsClick={handleDetailsClick}
          onEditClick={handleEditClick}
        />
        {/* Details Modal */}
        {selectedFigurine && (
          <FigurineModal
            figurine={selectedFigurine}
            onClose={() => setSelectedFigurine(null)}
          />
        )}
        {/* Edit Modal */}
        {selectedFigurineForEdit && (
          <FigurineEditModal
            figurine={selectedFigurineForEdit}
            onClose={() => setSelectedFigurineForEdit(null)}
            onSave={(updatedFigurine) => {
              console.log("Saving changes:", updatedFigurine);
              // API call or state update to save the edited figurine
              setSelectedFigurineForEdit(null); // Close modal after saving
            }}
          />
        )}
      </Stack>
    </div>
  );
};

const DataTable = ({ rows, onDetailsClick, onEditClick }) => {
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
            <div className="flex items-center space-x-2">
              <button
                className="px-4 py-2 bg-zinc-900 text-white rounded hover:bg-zinc-600 transition"
                onClick={() => onDetailsClick(figurine)}
              >
                Details
              </button>
              <button
                className="px-4 py-2 bg-zinc-900 text-white rounded hover:bg-zinc-600 transition"
                onClick={() => onEditClick(figurine)}
              >
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
    rowsPerPageOptions: [5, 7, 10, 15],
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