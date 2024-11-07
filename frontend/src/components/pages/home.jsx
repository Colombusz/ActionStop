// src/components/pages/home.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFigurines } from '../store/figurineSlice';
import ResponsiveAppBar from '../ui/navbar';

// import MediaCard from '../ui/figurineCard';
import FigurineCard3d from '../common/figurineCard3d';

const Home = () => {
  const dispatch = useDispatch();
  const { figurines, loading, error } = useSelector((state) => state.figurines);

  useEffect(() => {
    dispatch(fetchFigurines());
  }, [dispatch]);

  console.log('Fetched Figurines: ', figurines);

  return (
    <div className="home-page">
      <ResponsiveAppBar />

      <h1>Figurines</h1>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

    {/* <div className="w-full p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {Array.isArray(figurines) && figurines.map((figurine) => (
        <FigurineCard3d key={figurine._id} figurine={figurine} />
      ))}
    </div> */}

    <div className="w-full p-5 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-7xl mx-auto">
      {Array.isArray(figurines) && figurines.map((figurine) => (
        <div className="w-full"> {/* Ensure each card takes full width of its column */}
          <FigurineCard3d key={figurine._id} figurine={figurine} />
        </div>
      ))}
    </div>





   

    
    


    </div>
  );
};

export default Home;
