// src/components/pages/home.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites } from '../store/cardSlices/fetchFavoritesSlice'; // Ensure correct import
import FigurineCard3d from '../common/figurineCard3d';
import MainNavbar from '../common/navbar';
import ResponsiveFooter from '../common/footer';

const Favorites = () => {
  const dispatch = useDispatch();

  // Retrieve user data from localStorage and parse it
  const user = localStorage.getItem('user');
  const userid = user._id; // Ensure user exists before accessing _id

  // Extract favorites, loading, and error states from the Redux store
  const { favorites, loading, error } = useSelector((state) => state.fetchFavorites);

  // Fetch favorites when the component mounts or userid changes
  useEffect(() => {
    if (userid) {
      dispatch(fetchFavorites(userid)); // Dispatch action to fetch favorites
    }
  }, [dispatch, userid]);

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching favorites: {error}</div>;
  }

  console.log('Fetched users: ', favorites);

  return (
    <div className="home-page">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-black">
        <MainNavbar />
      </div>

      {/* Main Content */}
      <div className="pt-16"> {/* Use padding-top to prevent overlap with the navbar */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
          {/* Check if favorites is an array and render the figurine cards */}
          {Array.isArray(favorites) && favorites.length > 0 ? (
            favorites.map((figurine) => (
              <FigurineCard3d
                key={figurine._id}
                figurine={figurine}
              />
            ))
          ) : (
            <div>No favorites found.</div> // If favorites is empty or not an array
          )}
        </div>
      </div>

      <ResponsiveFooter />
    </div>
  );
};

export default Favorites;
