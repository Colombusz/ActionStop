import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import MUIDataTable from "mui-datatables";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalContent, ModalFooter, useModal } from "../ui/animated-modal";
import Loading from "../common/loading";

import { useOrderStore } from "../store/zorder";
import AdminSidebar from "./adminsidebar";

const OrdersDashboard = () => {
  const { fetchOrders, orders, updateOrder } = useOrderStore();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderToUpdate, setOrderToUpdate] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setOpen } = useModal();

  // Fetch orders on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchOrders();
      } catch (error) {
        toast.error("Failed to fetch orders.");
        console.error("Fetch Orders Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchOrders]);

  // Handle details view
  const handleDetailsClick = (order) => {
    setSelectedOrder((prev) => (prev?._id === order._id ? null : order));
  };

  // Handle update modal trigger
  const handleUpdateClick = (order) => {
    setOrderToUpdate(order);
    setOpen(true);
  };

  // Confirm status update
  const confirmUpdate = async () => {
    if (orderToUpdate) {
      try {
        setLoading(true);

        let newStatus;
        switch (orderToUpdate.status.toLowerCase()) {
          case "pending":
            newStatus = "shipping";
            break;
          case "shipping":
            newStatus = "completed";
            break;
          default:
            toast.info("Order cannot be updated further.");
            setOrderToUpdate(null);
            setOpen(false);
            return;
        }

        const updatedOrder = { ...orderToUpdate, status: newStatus };
        const result = await updateOrder(orderToUpdate._id, updatedOrder);

        if (result.success) {
          toast.success(`Order status updated to ${newStatus}.`);
        } else {
          toast.error("Failed to update order status.");
        }
      } catch (error) {
        toast.error("An error occurred while updating the order.");
        console.error("Update Order Error:", error);
      } finally {
        setOrderToUpdate(null);
        setOpen(false);
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <Loading loading={loading} />
      <div className="flex-1 p-5">
        <DataTable
          rows={orders}
          onDetailsClick={handleDetailsClick}
          onUpdateClick={handleUpdateClick}
          selectedOrder={selectedOrder}
        />

        {/* Update Confirmation Modal */}
        {orderToUpdate && (
          <UpdateOrderModal
            order={orderToUpdate}
            onClose={() => {
              setOrderToUpdate(null);
              setOpen(false);
            }}
            onConfirm={confirmUpdate}
          />
        )}

        {/* Order Details */}
        {selectedOrder && (
          <div className="p-4 bg-gray-100 border-t border-gray-300 mt-4 rounded-md shadow-md">
            <h2 className="font-bold text-xl mb-4">Order Details</h2>
            <p><strong>Order ID:</strong> {selectedOrder._id}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Total Price:</strong> ${selectedOrder.totalPrice}</p>
            <p><strong>Shipping Address:</strong> {selectedOrder.shippingAddress}</p>
            <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
            <p><strong>Created At:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
            
            <h3 className="font-bold text-lg mt-4">Buyer Details</h3>
            <p><strong>Name:</strong> {selectedOrder.user?.name || "Unknown User"}</p>
            <p><strong>Email:</strong> {selectedOrder.user?.email || "N/A"}</p>
            
            <h3 className="font-bold text-lg mt-4">Order Items</h3>
            <ul className="list-disc ml-6">
              {selectedOrder.orderItems.map((item, index) => (
                <li key={index} className="mb-4">
                  <p><strong>Figurine:</strong> {item.figurineName || "Unknown Figurine"}</p>
                  <p><strong>Quantity:</strong> {item.qty}</p>
                  <p>Images:</p>
                  <div className="flex space-x-2 mt-2">
                    {item.figurineImages.map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={image.url}
                        alt={`Figurine ${index} Image ${imgIndex}`}
                        className="w-16 h-16 object-cover"
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const DataTable = ({ rows = [], onDetailsClick, onUpdateClick, selectedOrder }) => {
  const columns = [
    { name: "_id", label: "Order ID" },
    { name: "status", label: "Status" },
    { name: "totalPrice", label: "Total Price" },
    { name: "shippingAddress", label: "Shipping Address" },
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (_, tableMeta) => {
          const rowIndex = tableMeta.rowIndex;
          const order = rows[rowIndex];
          const isUpdatable = order.status.toLowerCase() === "pending" || order.status.toLowerCase() === "shipping";

          return (
            <div className="flex items-center space-x-2">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition"
                onClick={() => onDetailsClick(order)}
              >
                {order._id === selectedOrder?._id ? "Collapse" : "Details"}
              </button>
              <button
                className={`px-4 py-2 text-white rounded transition ${
                  isUpdatable ? "bg-green-600 hover:bg-green-800" : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={() => isUpdatable && onUpdateClick(order)}
                disabled={!isUpdatable}
              >
                Update Status
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

  return (
    <Paper sx={{ width: "100%" }}>
      <MUIDataTable title="Orders Dashboard" data={rows} columns={columns} options={options} />
    </Paper>
  );
};

const UpdateOrderModal = ({ order, onClose, onConfirm }) => (
  <ModalBody>
    <ModalContent>
      <h2 className="text-lg font-bold mb-4">Confirm Status Update</h2>
      <p>Are you sure you want to update the status of this order?</p>
      <div className="mt-4 bg-gray-100 p-4 rounded-md">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Current Status:</strong> {order.status}</p>
        <p><strong>Total Price:</strong> ${order.totalPrice}</p>
      </div>
    </ModalContent>
    <ModalFooter>
      <button className="m-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800 transition" onClick={onConfirm}>
        Confirm
      </button>
      <button className="m-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-800 transition" onClick={onClose}>
        Cancel
      </button>
    </ModalFooter>
  </ModalBody>
);

export default OrdersDashboard;
