// src/components/pages/home.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFigurines } from '../store/figurineSlice';

import FigurineCard3d from '../common/figurineCard3d';
import MainNavbar from '../common/navbar';

const Home = () => {
  const dispatch = useDispatch();
  const { figurines, loading, error } = useSelector((state) => state.figurines);

  useEffect(() => {
    dispatch(fetchFigurines());
  }, [dispatch]);

  console.log('Fetched Figurines: ', figurines);

  return (
    <div className="home-page">
      <MainNavbar />

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-auto">
        {Array.isArray(figurines) &&
          figurines.map((figurine, index) => (
            <FigurineCard3d
              key={figurine._id}
              figurine={figurine}
            />
          ))}
      </div>

    </div>
  );
};

export default Home;
