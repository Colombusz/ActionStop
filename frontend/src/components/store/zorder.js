import { create } from "zustand";

export const useOrderStore = create((set) => ({
  orders: [],
  setOrders: (orders) => set({ orders }),

  fetchOrders: async () => {
    try {
      // Fetch orders
      const res = await fetch("/api/orders");
      const { data: orders } = await res.json();
  
      // console.log("Fetched Orders:", orders);
  
      if (!orders || !orders.length) {
        console.warn("No orders found");
        set({ orders: [] });
        return;
      }
  
      // Extract unique figurine and user IDs
      const figurineIds = [
        ...new Set(orders.flatMap((order) => order.orderItems.map((item) => item.figurine))),
      ];
      const userIds = [...new Set(orders.map((order) => order.user))];
  
      // console.log("Figurine IDs:", figurineIds);
      // console.log("User IDs:", userIds);
  
      // Fetch figurine and user data in parallel
      const [figurineResponse, userResponse] = await Promise.all([
        fetch(`/api/figurines?ids=${figurineIds.join(",")}`).then((res) => res.json()),
        fetch(`/api/auth/users?ids=${userIds.join(",")}`).then((res) => res.json()),
      ]);
  
      // Handle cases where the responses are not arrays
      const figurineData = Array.isArray(figurineResponse.data)
        ? figurineResponse.data
        : [];
      const userData = Array.isArray(userResponse.users)
        ? userResponse.users
        : [];
  
      // console.log("Figurine Data:", figurineData);
      // console.log("User Data:", userData);
  
      // Map figurine IDs to their data
      const figurinesMap = figurineData.reduce((acc, figurine) => {
        acc[figurine._id] = {
          name: figurine.name,
          images: figurine.images || [],
        };
        return acc;
      }, {});
  
      // Map user IDs to their data
      const usersMap = userData.reduce((acc, user) => {
        acc[user._id] = {
          name: user.username,
          email: user.email,
        };
        return acc;
      }, {});
  
      // Enrich orders with figurine and user data
      const enrichedOrders = orders.map((order) => ({
        ...order,
        user: usersMap[order.user] || { name: "Unknown User", email: "" },
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
