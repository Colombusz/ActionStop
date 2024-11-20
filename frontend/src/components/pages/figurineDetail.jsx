// src/components/pages/home.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ResponsiveFooter from '../common/footer';

import MainNavbar from '../common/navbar';

const Details = () => {
 

  return (
    
    <div className="home-page">
      <MainNavbar />

    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-auto mt-10">

    </div>

      
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-auto mt-10">
    
       
         
      </div>
      <ResponsiveFooter />
    </div>
    
  );
};

export default Details;
