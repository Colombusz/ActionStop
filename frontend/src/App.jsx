import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './index.css';

// Import Provider and Redux store
import { Provider } from 'react-redux';
import store from './components/store/store.js';  // Make sure your store is correctly exported from store/store.js

// Admin
import AdminHomePage from './components/admin/home';

// User
import Home from './components/home';
import About from './components/about';

function App() {
  return (
    <Provider store={store}>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              {/* LINKS HERE */}
              {/* User / Non user */}
              <Link to="/about"></Link>
              <Link to="/home"></Link>
              {/* Admin */}
              <Link to="/admin"></Link>
            </li>
          </ul>
        </nav>

        <Routes>
          {/* ROUTES HERE */}
          {/* User / Non User */}
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<Home />} />


          {/* Admin */}
          <Route path="/admin" element={<AdminHomePage />} />
        </Routes>
      </div>
    </Router>
    </Provider>
  )
}

export default App;
