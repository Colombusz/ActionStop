// src/components/pages/home.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFigurines } from '../store/figurineSlice';
import ResponsiveAppBar from '../ui/navbar';
import MediaCard from '../ui/figurineCard';

const Home = () => {
  const dispatch = useDispatch();
  const { figurines, loading, error } = useSelector((state) => state.figurines);

  useEffect(() => {
    dispatch(fetchFigurines());
  }, [dispatch]);

  return (
    <div className="home-page">
      <ResponsiveAppBar />

      <h1>Figurines</h1>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div className="figurine-cards">
        {figurines.map((figurine) => (
          <MediaCard key={figurine._id} figurine={figurine} />
        ))}
      </div>
    </div>
  );
};

export default Home;
