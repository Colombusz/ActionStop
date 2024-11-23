import { create } from "zustand";

export const useReviewStore = create((set) => ({
    reviews: [],
    setReviews: (reviews) => set({ reviews }),

    fetchReviews: async () => {
        try {
            const res = await fetch("/api/reviews");
            const { data: reviews } = await res.json();
    
            // console.log("Reviews Data:", reviews);
    
            const figurineIds = [...new Set(reviews.map((review) => review.figurine))];
            const userIds = [...new Set(reviews.map((review) => review.user))];
    
            // console.log("Figurine IDs:", figurineIds);
            // console.log("User IDs:", userIds);

            const [figurineResponse, userResponse] = await Promise.all([
                fetch(`/api/figurines?ids=${figurineIds.join(",")}`).then((res) => res.json()),
                fetch(`/api/auth/users?ids=${userIds.join(",")}`).then((res) => res.json()),
            ]);
    
            // console.log("Figurine Data Response:", figurineResponse);
            // console.log("User Data Response:", userResponse);
            // console.log("userResponse User:", userResponse.users);
    
            // Handle cases where figurineResponse or userResponse are not arrays
            const figurineData = Array.isArray(figurineResponse.data)
                ? figurineResponse.data
                : [figurineResponse.data];
            const userData = Array.isArray(userResponse.users) ? userResponse.users : [];
    
            // console.log("Extracted Figurine Data:", figurineData);
            // console.log("Extracted User Data:", userData);
    
            const figurinesMap = figurineData.reduce((acc, figurine) => {
                acc[figurine._id] = figurine;
                return acc;
            }, {});
    
            const usersMap = userData.reduce((acc, user) => {
                acc[user._id] = user;
                return acc;
            }, {});
    
            const enrichedReviews = reviews.map((review) => ({
                ...review,
                figurine: figurinesMap[review.figurine]?.name || "Unknown Figurine",
                user: usersMap[review.user]?.username || "Unknown User",
            }));

            // console.log("Enriched Reviews:", enrichedReviews);
    
            set({ reviews: enrichedReviews });
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    },
    
    deleteReview: async (rid) => {
        const res = await fetch(`/api/reviews/${rid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set(state => ({ reviews: state.reviews.filter(review => review._id !== rid) }));

        return { success: true, message: data.message };
    },

}));