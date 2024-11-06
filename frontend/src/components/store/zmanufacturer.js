import { create } from "zustand";

export const useManufacturerStore = create((set) => ({
    manufacturers: [],
    setManufacturers: (manufacturers) => set({ manufacturers }),

    createManufacturer: async (newManufacturer) => {
        if (!newManufacturer.name || !newManufacturer.country || !newManufacturer.image) {
            return { success: false, message: "Please fill in all Fields." };
        }
        const res = await fetch("/api/manufacturers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newManufacturer)
        });
        const data = await res.json();
        set((state) => ({ manufacturers: [...state.manufacturers, data.data] }));

        return { success: true, message: "Manufacturer Created Successfully." };
    },

    fetchManufacturers: async () => {
        try {
            const res = await fetch("/api/manufacturers");
            const data = await res.json();
            console.log("API response:", data);  // Log response to verify structure
    
            set({ manufacturers: data.data });
        } catch (error) {
            console.error("Error fetching manufacturers:", error);
        }
    },

    deleteManufacturer: async (mid) => {
        const res = await fetch(`/api/manufacturers/${mid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set(state => ({ manufacturers: state.manufacturers.filter(manufacturer => manufacturer._id !== mid) }));

        return { success: true, message: data.message };
    },

    updateManufacturer: async (mid, updatedManufacturer) => {
        const res = await fetch(`/api/manufacturers/${mid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedManufacturer)
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set(state => ({
            manufacturers: state.manufacturers.map((manufacturer) => (manufacturer._id === mid ? data.data : manufacturer)),
        }));

        return { success: true, message: data.message };
    },
}));