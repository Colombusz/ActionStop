import { create } from "zustand";

export const usePromoStore = create((set) => ({
    promos: [],
    setPromos: (promos) => set({ promos }),

    createPromo: async (newPromo) => {
        if (!newPromo.name || !newPromo.discount || !newPromo.image || !newPromo.figurine || !newPromo.description || !newPromo.expiry) {
            return { success: false, message: "Please fill in all Fields." };
        }
        const res = await fetch("/api/promos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPromo)
        });
        const data = await res.json();
        set((state) => ({ promos: [...state.promos, data.data] }));

        return { success: true, message: "Promo Created Successfully." };
    },

    fetchPromos: async () => {
        try {
            const res = await fetch("/api/promos");
            const data = await res.json();
            console.log("API response:", data);  // Log response to verify structure
    
            set({ promos: data.data });
        } catch (error) {
            console.error("Error fetching promos:", error);
        }
    },

    deletePromo: async (pid) => {
        const res = await fetch(`/api/promos/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set(state => ({ promos: state.promos.filter(promo => promo._id !== pid) }));

        return { success: true, message: data.message };
    },

    updatePromo: async (pid, updatedPromo) => {
        const res = await fetch(`/api/promos/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedPromo)
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set(state => ({
            promos: state.promos.map((promo) => (promo._id === pid ? data.data : promo)),
        }));

        return { success: true, message: data.message };
    },
}));