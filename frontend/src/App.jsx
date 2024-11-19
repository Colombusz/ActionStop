import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './index.css';

// Import Provider and Redux store
import { Provider } from 'react-redux';
import store from './components/store/store.js';  // Make sure your store is correctly exported from store/store.js

// Admin
import AdminHomePage from './components/admin/home';
import AdminSidebar from './components/admin/adminsidebar';
import FigurineDashboard from './components/admin/figurine.jsx';
import ManufacturerDashboard from './components/admin/manufacturer.jsx';
import PromoDashboard from './components/admin/promo.jsx';

// User / Non User
import Home from './components/pages/home';
import About from './components/pages/about';
import Signup from './components/pages/signup';

function App() {
  return (
    <Provider store={store}>
    <Router>
      <div>
        <Routes>
          {/* ROUTES HERE */}
          {/* User / Non User */}
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />


          {/* Admin */}
          <Route path="/admin" element={<AdminHomePage />} />
          <Route path="/admin/figurines" element={<FigurineDashboard />} />
          <Route path="/admin/manufacturers" element={<ManufacturerDashboard />} />
          <Route path="/admin/promos" element={<PromoDashboard />} />
        </Routes>
      </div>
    </Router>
    </Provider>
  )
}

export default App;
