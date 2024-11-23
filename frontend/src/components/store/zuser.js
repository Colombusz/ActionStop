import { create } from "zustand";

export const useUserStore = create((set) => ({
    users: [],
    currentUser: null, // Current user logged in
    setUsers: (users) => set({ users }),

    // fetchCurrentUser: async () => {
    //     try {
    //       const res = await fetch("/current-user");
    //       const data = await res.json();
    //       set({ currentUser: data });
    //       console.log("Current User:", data);  
    //     } catch (error) {
    //       console.error("Error fetching current user:", error);
    //     }
    // },

    // Get Users
    fetchUsers: async () => {
        try {
            const res = await fetch("/users");
            const data = await res.json();
            set({ users: data.data });
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    },

    // Get User by ID
    fetchUserById: async (uid) => {
        try {
            const res = await fetch(`/users/${uid}`);
            const data = await res.json();
            return { success: true, data: data.data };
        } catch (error) {
            console.error("Error fetching user by ID:", error);
            return { success: false, message: error.message };
        }
    },

    // Update current user
    updateCurrentUser: async (uid ,updatedUser) => {
        try {
            const res = await fetch(`/user/${uid}`, {
                method: "PUT",
                body: updatedUser, // FormData
            });
            const data = await res.json();
            if (!data.success) return { success: false, message: data.message };

            set({ currentUser: data.data });

            return { success: true, message: data.message };
        } catch (error) {
            console.error("Error updating current user:", error);
            return { success: false, message: error.message };
        }
    },

    // deleteUser: async (uid) => {
    //     const res = await fetch(`/api/users/${uid}`, {
    //         method: "DELETE",
    //     });
    //     const data = await res.json();
    //     if (!data.success) return { success: false, message: data.message };

    //     set(state => ({ users: state.users.filter(user => user._id !== uid) }));

    //     return { success: true, message: data.message };
    // },

    // updateUser: async (uid, updatedUser) => {
    //     const res = await fetch(`/api/users/${uid}`, {
    //         method: "PUT",
    //         body: updatedUser, // FormData
    //     });
    //     const data = await res.json();
    //     if (!data.success) return { success: false, message: data.message };

    //     set(state => ({
    //         users: state.users.map((user) => (user._id === uid ? data.data : user)),
    //     }));

    //     return { success: true, message: data.message };
    // },

    // createUser: async (newUser) => {
    //     // DEBUGGING
    //     for (let [key, value] of newUser.entries()) {
    //         console.log(`${key}: ${value}`);
    //     }

    //     const res = await fetch("/api/users", {
    //         method: "POST",
    //         body: newUser, // FormData object
    //     });

    //     if (!res.ok) {
    //         const errorData = await res.json();
    //         console.error("Error creating user:", errorData.message);
    //         return { success: false, message: errorData.message };
    //     }

    //     const data = await res.json();
    //     set((state) => ({ users: [...state.users, data.data] }));

    //     return { success: true, message: "User Created Successfully." };
    // },
}));