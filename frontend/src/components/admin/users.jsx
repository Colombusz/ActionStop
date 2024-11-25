import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import MUIDataTable from "mui-datatables";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalContent, ModalFooter, useModal } from "../ui/animated-modal";
import Loading from "../common/loading";
import { useUserStore } from "../store/zuser";
import AdminSidebar from "./adminsidebar";

const UsersDashboard = () => {
  const { fetchUsers, users } = useUserStore();
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setOpen } = useModal();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUsers();
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchUsers]);

  const handleDetailsClick = (user) => {
    setSelectedUser((prev) => (prev?._id === user._id ? null : user));
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
          <h1 className="font-delius text-3xl font-bold">Users Dashboard</h1>
        </div>

        <DataTable
          rows={users}
          onDetailsClick={handleDetailsClick}
          selectedUser={selectedUser}
        />

        {/* User Details */}
        {selectedUser && (
          <div className="p-4 bg-gray-100 border-t border-gray-300 mt-4">
            <h2 className="font-bold text-xl mb-4">User Details</h2>
            <p className="mb-2">
              <strong className="mr-10">Firstname:</strong> {selectedUser.firstname}
            </p>
            <p className="mb-2">
              <strong className="mr-11">Lastname:</strong> {selectedUser.lastname}
            </p>
            <p className="mb-2">
              <strong className="mr-16">Email:</strong> {selectedUser.email}
            </p>
            <p className="mb-2">
              <strong className="mr-12">Address:</strong>{" "}
              {selectedUser.address || "N/A"}
            </p>
            <p className="mb-2">
              <strong className="mr-16">Phone:</strong> {selectedUser.phone || "N/A"}
            </p>
            <p className="mb-2">
              <strong className="mr-14">Verified:</strong>{" "}
              {selectedUser.isVerified ? "Yes" : "No"}
            </p>
            <p className="mb-2">
              <strong className="mr-16">Admin:</strong> {selectedUser.isAdmin ? "Yes" : "No"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const DataTable = ({ rows, onDetailsClick, selectedUser }) => {
  const columns = [
    { name: "_id", label: "ID" },
    { name: "username", label: "Username" },
    { name: "email", label: "Email" },
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (_, tableMeta) => {
          const rowIndex = tableMeta.rowIndex;
          const user = rows[rowIndex];
          return (
            <div className="flex items-center space-x-2">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition"
                onClick={() => onDetailsClick(user)}
              >
                {user._id === selectedUser?._id ? "Collapse" : "Details"}
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
      <MUIDataTable title={"Users List"} data={data} columns={columns} options={options} />
    </Paper>
  );
};

export default UsersDashboard;
