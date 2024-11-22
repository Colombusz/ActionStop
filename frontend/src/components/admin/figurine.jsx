import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import MUIDataTable from "mui-datatables";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from 'react-toastify';

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
  const [selectedIds, setSelectedIds] = useState(new Set());

  useEffect(() => {
    const fetchData = async () => {
      await fetchFigurines();
    };
    fetchData();
  }, [fetchFigurines]);

  const handleDetailsClick = (figurine) => {
    setSelectedFigurine(figurine);
    setOpen(true); // Details Modal
  };

  const handleEditClick = (figurine) => {
    setSelectedFigurineForEdit(figurine);
    setOpen(true); // Edit Modal
  };

  const handleAddClick = () => {
    setIsAddModalOpen(true); // Add Modal
    setOpen(true);
  };

  const handleDeleteClick = (figurine) => {
    setFigurineToDelete(figurine);
    setOpen(true);
  };

  const handleBatchDelete = () => {
    const idsArray = Array.from(selectedIds); // Convert Set to Array
    if (idsArray.length === 0) {
      toast.error("No selected IDs to delete.");
      console.log("No selected IDs to delete.");
      return;
    }
    const figurinesToDelete = figurines.filter(fig => idsArray.includes(fig._id)); // Find figurines by ID
    setFigurineToDelete(figurinesToDelete);
    setOpen(true); 
  };
  
  const confirmDelete = async () => {
    if (figurineToDelete && figurineToDelete.length > 0) {
      try {
        for (const fig of figurineToDelete) {
          await deleteFigurine(fig._id); // Call API for each figurine
        }
        fetchFigurines(); 
      } catch (error) {
        console.error("Failed to delete figurines:", error);
      } finally {
        setFigurineToDelete(null);
        setSelectedIds(new Set()); // Clear selected IDs
        toast.success("Figurine(s) deleted successfully.");
      }
    }
  };
  

  return (
    <div className="flex">
      <AdminSidebar />
      <Stack spacing={2} className="flex-1 p-5">
        <div className='flex justify-between items-center mb-4'>
          <h1 className="font-delius text-3xl font-bold">"ActionStop!" Figurine Dashboard</h1>

          {/* Add Button */}
          <div className="">
          <button
            className="m-2 px-4 py-2 bg-zinc-900 text-white rounded hover:bg-green-500 transition"
            onClick={handleAddClick}
          >
            Add New Figurine
          </button>
          {/* Batch Delete */}
          <button
            className="px-4 py-2 bg-zinc-900 text-white rounded hover:bg-red-500 transition"
            onClick={handleBatchDelete}
          >
            Batch Delete
          </button>
          </div>

          
        </div>

        <DataTable
          rows={figurines}
          onDetailsClick={handleDetailsClick}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
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

const DataTable = ({ rows, onDetailsClick, onEditClick, onDeleteClick, selectedIds, setSelectedIds, }) => {
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleRowExpansion = (rowIndex) => {
    setExpandedRow((prev) => (prev === rowIndex ? null : rowIndex));
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };

  const columns = [
    {
      name: "Select",
      label: "",
      options: {
        customBodyRenderLite: (dataIndex) => {
          const rowId = rows[dataIndex]._id;
          return (
            <input
              type="checkbox"
              checked={selectedIds.has(rowId)}
              onChange={() => handleCheckboxChange(rowId)}
            />
          );
        },
        filter: false,
        sort: false,
      },
    },
    { name: "_id", label: "ID" },
    { name: "name", label: "Figure Name" },
    { name: "price", label: "Price" },
    { name: "origin", label: "Origin" },
    { name: "classification", label: "Classification" },
    {
      name: "actions",
      label: "Actions",
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
                Image
              </button>
              <button
                className="px-4 py-2 bg-zinc-900 text-white rounded hover:bg-zinc-600 transition"
                onClick={() => onEditClick(figurine)}
              >
                Edit
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition"
                onClick={() => toggleRowExpansion(rowIndex)}
              >
                {expandedRow === rowIndex ? "Collapse" : "Expand"}
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
    filterType: "checkbox",
    selectableRows: "none",
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 7, 10, 15],
  };

  const data = (rows || []).map((row) => ({
    _id: row?._id || "N/A",
    name: row?.name || "N/A",
    price: row?.price || 0,
    origin: row?.origin || "Unknown",
    classification: row?.classification || "Uncategorized",
    description: row?.description || "No description available.",
    images: row?.images?.map((img) => img.url) || [],
    manufacturer: row?.manufacturer || [],
    reviews: row?.reviews || [],
    createdAt: row?.createdAt || "N/A",
    updatedAt: row?.updatedAt || "N/A",
    actions: null,
  }));

  return (
    <Paper sx={{ width: "100%" }}>
      <MUIDataTable
        title={"Figurine List"}
        data={data}
        columns={columns}
        options={options}
      />
      {data.map((row, index) => (
        <React.Fragment key={index}>
          {expandedRow === index && (
            <div className="p-4 bg-gray-100 border-t border-gray-300">
              <p>
                <strong>Description:</strong> {row.description}
              </p>
              <p>
                <strong>Images:</strong>
              </p>
              <div className="flex space-x-2">
                {row.images.length > 0 ? (
                  row.images.map((url, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={url}
                      alt={`Figure Image ${imgIndex + 1}`}
                      className="w-20 h-20 object-cover rounded border"
                    />
                  ))
                ) : (
                  <span>No images available.</span>
                )}
              </div>
              <p>
                <strong>Manufacturer:</strong>
              </p>
              {row.manufacturer.length > 0 ? (
                row.manufacturer.map((man, manIndex) => (
                  <p key={manIndex}>
                    - {man.name} ({man.country})
                  </p>
                ))
              ) : (
                <p>No manufacturer information.</p>
              )}
              <p>
                <strong>Created At:</strong> {row.createdAt}
              </p>
              <p>
                <strong>Updated At:</strong> {row.updatedAt}
              </p>
            </div>
          )}
        </React.Fragment>
      ))}
    </Paper>
  );

  
};


export default FigurineDashboard;