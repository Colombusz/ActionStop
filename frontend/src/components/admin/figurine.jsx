import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import MUIDataTable from "mui-datatables";
import { FaTrashAlt } from "react-icons/fa";

import AdminSidebar from './adminsidebar';
import { useFigurineStore } from '../store/zfigurine';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useModal,
} from '../ui/animated-modal';
import FigurineModal from './modals/figurineModal';
import FigurineEditModal from './modals/figurineEditModal';
import FigurineAddModal from './modals/figurineAddModal';
import FigurineDeleteModal from './modals/figurineDeleteModal.jsx';

const FigurineDashboard = () => {
  const { fetchFigurines, figurines, deleteFigurine } = useFigurineStore();
  const [selectedFigurine, setSelectedFigurine] = useState(null);
  const [selectedFigurineForEdit, setSelectedFigurineForEdit] = useState(null);
  const [figurineToDelete, setFigurineToDelete] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { setOpen } = useModal();

  useEffect(() => {
    const fetchData = async () => {
      await fetchFigurines();
    };
    fetchData();
  }, [fetchFigurines]);

  const handleDetailsClick = (figurine) => {
    setSelectedFigurine(figurine);
    setOpen(true); // Open the Details Modal
  };

  const handleEditClick = (figurine) => {
    setSelectedFigurineForEdit(figurine);
    setOpen(true); // Open the Edit Modal
  };

  const handleAddClick = () => {
    setIsAddModalOpen(true); // Open the Add Modal
    setOpen(true);
  };

  const handleDeleteClick = (figurine) => {
    setFigurineToDelete(figurine);
    setOpen(true);
  };

  const confirmDelete = async () => {
    if (figurineToDelete) {
      try {
        await deleteFigurine(figurineToDelete._id);
        fetchFigurines(); // Refresh the list
      } catch (error) {
        console.error("Failed to delete figurine:", error);
      } finally {
        setFigurineToDelete(null);
      }
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <Stack spacing={2} className="flex-1 p-5">
        <h1 className="font-delius text-3xl font-bold mb-4">"ActionStop!" Figurine Dashboard</h1>

        {/* Add Button */}
        <div className="flex justify-start mt-4">
          <button
            className="px-4 py-2 bg-zinc-900 text-white rounded hover:bg-green-500 transition"
            onClick={handleAddClick}
          >
            Add New Figurine
          </button>
        </div>

        <DataTable
          rows={figurines}
          onDetailsClick={handleDetailsClick}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />

        {/* Details Modal */}
        {selectedFigurine && (
          <FigurineModal
            figurine={selectedFigurine}
            onClose={() => setSelectedFigurine(null)}
          />
        )}

        {/* Delete Confirmation Modal */}
        {figurineToDelete && (
          <FigurineDeleteModal
            figurine={figurineToDelete}
            onClose={() => { setFigurineToDelete(null) }}
            onConfirm={confirmDelete}
          />
        )}

        {/* Edit Modal */}
        {selectedFigurineForEdit && (
          <FigurineEditModal
            figurine={selectedFigurineForEdit}
            onClose={() => setSelectedFigurineForEdit(null)}
            onSave={() => {
              setSelectedFigurineForEdit(null);
              fetchFigurines(); // Refresh the list
            }}
          />
        )}

        {/* Add Modal */}
        {isAddModalOpen && (
          <FigurineAddModal
            onClose={() => { setIsAddModalOpen(false) }}
            onSave={() => {
              setIsAddModalOpen(false);
              fetchFigurines(); // Refresh the list
            }}
          />
        )}
      </Stack>
    </div>
  );
};

const DataTable = ({ rows, onDetailsClick, onEditClick, onDeleteClick }) => {
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
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800 transition"
                onClick={() => onDeleteClick(figurine)}
              >
                <FaTrashAlt />
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
    rowsPerPageOptions: [5, 7],
  };

  const data = (rows || []).map((row) => ({
    _id: row?._id || "N/A",
    name: row?.name || "N/A",
    price: row?.price || 0,
    origin: row?.origin || "Unknown",
    classification: row?.classification || "Uncategorized",
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
