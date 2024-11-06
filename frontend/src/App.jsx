import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './index.css'


// Admin
import AdminHomePage from './components/admin/home';


// User
import Home from './components/home';
import About from './components/about';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              {/* LINKS HERE */}
              {/* User / Non user */}
              <Link to="/about"></Link>

              {/* Admin */}
              <Link to="/admin"></Link>
            </li>
          </ul>
        </nav>

        <Routes>
          {/* ROUTES HERE */}
          {/* User / Non User */}
          <Route path="/about" element={<About />} />


          {/* Admin */}
          <Route path="/admin" element={<AdminHomePage />} />
        </Routes>
      </div>
    </Router>
  )
}



export default App
