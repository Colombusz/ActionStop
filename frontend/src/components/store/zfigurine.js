import { create } from "zustand";

export const useFigurineStore = create((set) => ({
    figurines: [],
    setFigurines: (figurines) => set({ figurines }),

    createFigurine: async (newFigurine) => {
        // DEBUGGING
        for (let [key, value] of newFigurine.entries()) {
            console.log(`${key}: ${value}`);
        }
    
        const res = await fetch("/api/figurines", {
            method: "POST",
            body: newFigurine, // FormData object
        });
    
        if (!res.ok) {
            const errorData = await res.json();
            console.error("Error creating figurine:", errorData.message);
            return { success: false, message: errorData.message };
        }
    
        const data = await res.json();
        set((state) => ({ figurines: [...state.figurines, data.data] }));
    
        return { success: true, message: "Figurine Created Successfully." };
    },

    fetchFigurines: async () => {
        try {
            const res = await fetch("/api/figurines");
            const data = await res.json();
            set({ figurines: data.data });
        } catch (error) {
            console.error("Error fetching figurines:", error);
        }
    },

    deleteFigurine: async (fid) => {
        const res = await fetch(`/api/figurines/${fid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set(state => ({ figurines: state.figurines.filter(figurine => figurine._id !== fid) }));

        return { success: true, message: data.message };
    },

    updateFigurine: async (fid, updatedFigurine) => {
        const res = await fetch(`/api/figurines/${fid}`, {
            method: "PUT",
            body: updatedFigurine, // FormData
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set(state => ({
            figurines: state.figurines.map((figurine) => (figurine._id === fid ? data.data : figurine)),
        }));

        return { success: true, message: data.message };
    },
}));
