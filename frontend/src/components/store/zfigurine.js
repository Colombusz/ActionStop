import { create } from "zustand";

export const useFigurineStore = create((set) => ({
    figurines: [],
    setFigurines: (figurines) => set({ figurines }),

    createFigurine: async (newFigurine) => {
        if (!newFigurine.name || !newFigurine.image || !newFigurine.price) {
            return { success: false, message: "Please fill in all Fields." };
        }
        const res = await fetch("/api/figurines", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFigurine)
        });
        const data = await res.json();
        set((state) => ({ figurines: [...state.figurines, data.data] }));

        return { success: true, message: "Figurine Created Successfully." };
    },

    fetchFigurines: async () => {
        try {
            const res = await fetch("/api/figurines");
            const data = await res.json();
            console.log("API response:", data);  // Log response to verify structure
    
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
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFigurine)
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set(state => ({
            figurines: state.figurines.map((figurine) => (figurine._id === fid ? data.data : figurine)),
        }));

        return { success: true, message: data.message };
    },
}));