import { create } from "zustand";

export const useOrderStore = create((set) => ({
  orders: [],
  setOrders: (orders) => set({ orders }),

  fetchOrders: async () => {
    try {
      // Fetch orders
      const res = await fetch("/api/orders");
      const { data: orders } = await res.json();

      // Extract unique figurine IDs from the orders
      const figurineIds = [
        ...new Set(orders.flatMap((order) => order.orderItems.map((item) => item.figurine))),
      ];

      // Fetch figurine details
      const figurineResponse = await fetch(`/api/figurines?ids=${figurineIds.join(",")}`);
      const figurineData = await figurineResponse.json();

      // Map figurine IDs to their data
      const figurinesMap = figurineData.data.reduce((acc, figurine) => {
        acc[figurine._id] = {
          name: figurine.name,
          images: figurine.images || [],
        };
        return acc;
      }, {});

      // Enrich orders with figurine names and images
      const enrichedOrders = orders.map((order) => ({
        ...order,
        orderItems: order.orderItems.map((item) => ({
          ...item,
          figurineName: figurinesMap[item.figurine]?.name || "Unknown Figurine",
          figurineImages: figurinesMap[item.figurine]?.images || [],
        })),
      }));

      console.log("Enriched Orders:", enrichedOrders);

      // Update Zustand state
      set({ orders: enrichedOrders });
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  },

  updateOrder: async (id, updatedOrder) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedOrder),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (!data.success) return { success: false, message: data.message };

      // Update the state with the updated order
      set((state) => ({
        orders: state.orders.map((order) =>
          order._id === id
            ? {
                ...data.data,
                orderItems: data.data.orderItems.map((item) => ({
                  ...item,
                  figurineName:
                    state.orders.find((o) => o._id === id)?.orderItems.find((i) => i.figurine === item.figurine)
                      ?.figurineName || "Unknown Figurine",
                  figurineImages:
                    state.orders.find((o) => o._id === id)?.orderItems.find((i) => i.figurine === item.figurine)
                      ?.figurineImages || [],
                })),
              }
            : order
        ),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error updating order:", error);
      return { success: false, message: "An error occurred while updating the order." };
    }
  },
}));
