// src/components/pages/home.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFigurines } from '../store/figurineSlice';
import ResponsiveFooter from '../common/footer';
import FigurineCard3d from '../common/figurineCard3d';
import MainNavbar from '../common/navbar';

const Home = () => {


  const dispatch = useDispatch();
  const { figurines, loading, error } = useSelector((state) => state.figurines);
 

  useEffect(() => {
    dispatch(fetchFigurines());
  }, [dispatch]);

  console.log('Fetched Figurines: ', figurines);


  // console.log(typeof cartData);

  return (
    
  <div className="home-page">
  {/* Navbar */}
  <div className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-black">
    <MainNavbar 
      
    />
  </div>

  {/* Main Content */}
  <div className="pt-16"> {/* Use padding-top to prevent overlap with the navbar */}
    {loading && <p className="text-center text-lg text-blue-500">Loading...</p>}
    {error && <p className="text-center text-lg text-red-500">Error: {error}</p>}

    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4"> {/* Spacing between items */}
    {Array.isArray(figurines) && figurines.length > 0 ? (
            figurines.map((figurine) => (
              <FigurineCard3d
                key={figurine._id}
                figurine={figurine}
              />
            ))
          ) : (
            <div>No Figurines found.</div> // If favorites is empty or not an array
          )}
    </div>

    <ResponsiveFooter />
  </div>
</div>

    
  );
};

export default Home;
