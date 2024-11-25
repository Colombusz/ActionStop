import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import MUIDataTable from "mui-datatables";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalContent, ModalFooter, useModal } from "../ui/animated-modal"; 
import DocumentDeleteModal from "./modals/reviewDeleteModal.jsx"; 
import Loading from "../common/loading";

import { useReviewStore } from "../store/zreview";
import AdminSidebar from "./adminsidebar";

const ReviewsDashboard = () => {
  const { fetchReviews, reviews, deleteReview } = useReviewStore();
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setOpen } = useModal();

  useEffect(() => {
    const fetchData = async () => {
      await fetchReviews();
      setLoading(false);
    };
    fetchData();
  }, [fetchReviews]);

  const handleDetailsClick = (review) => {
    setSelectedReview((prev) => (prev?._id === review._id ? null : review));
  };

  const handleDeleteClick = (review) => {
    console.log("Review to delete:", review);
    setReviewToDelete(review);
    setOpen(true); 
  };

  const confirmDelete = async () => {
    if (reviewToDelete) {
      try {
        setLoading(true);
        await deleteReview(reviewToDelete._id);
        setReviewToDelete(null);
        toast.success("Review deleted successfully.");
        await fetchReviews(); // Refresh data
      } catch (error) {
        toast.error("Failed to delete the review.");
        console.error("Delete Review Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

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
      <Loading loading={loading} />
      <div className="flex-1 p-5">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-delius text-3xl font-bold">Reviews Dashboard</h1>
        </div>

        <DataTable
          rows={reviews}
          onDetailsClick={handleDetailsClick}
          onDeleteClick={handleDeleteClick}
          selectedReview={selectedReview}
        />

        {/* Delete Confirmation Modal */}
        {reviewToDelete && (
            <DocumentDeleteModal
              document={reviewToDelete} // Pass the single review as `document`
              onClose={() => {
                setReviewToDelete(null);
                setOpen(false);
              }}
              onConfirm={confirmDelete}
            />
        )}

        {/* Review Details */}
        {selectedReview && (
          <div className="p-4 bg-gray-100 border-t border-gray-300 mt-4">
            <h2 className="font-bold text-xl mb-4">Review Details</h2>
            <p className="mb-2">
              <strong className="mr-10">Rating:</strong> {selectedReview.rating}
            </p>
            <p className="mb-2">
              <strong className="mr-4">Comment:</strong> {selectedReview.comment}
            </p>
            <p className="mb-2">
              <strong className="mr-14">User:</strong> {selectedReview.user}
            </p>
            <p className="mb-2">
              <strong className="mr-7">Figurine:</strong> {selectedReview.figurine}
            </p>
            <p className="mb-2">
              <strong className="mr-14">Date:</strong>{" "}
              {new Date(selectedReview.createdAt).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const DataTable = ({ rows, onDetailsClick, onDeleteClick, selectedReview }) => {
  const columns = [
    { name: "rating", label: "Rating" },
    { name: "comment", label: "Comment" },
    {
      name: "user",
      label: "User",
      options: {
        customBodyRenderLite: (dataIndex) => rows[dataIndex].user || "N/A",
      },
    },
    {
      name: "figurine",
      label: "Figurine",
      options: {
        customBodyRenderLite: (dataIndex) => rows[dataIndex].figurine || "N/A",
      },
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (_, tableMeta) => {
          const rowIndex = tableMeta.rowIndex;
          const review = rows[rowIndex];
          return (
            <div className="flex items-center space-x-2">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition"
                onClick={() => onDetailsClick(review)}
              >
                {review._id === selectedReview?._id ? "Collapse" : "Details"}
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800 transition"
                onClick={() => onDeleteClick(review)}
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
    rowsPerPageOptions: [5, 10, 15],
  };

  const data = Array.isArray(rows) ? rows : [];

  return (
    <Paper sx={{ width: "100%" }}>
      <MUIDataTable title={"Review List"} data={data} columns={columns} options={options} />
    </Paper>
  );
};

export default ReviewsDashboard;

