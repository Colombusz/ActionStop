import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './index.css'


// Admin


// User
import About from './components/about';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              {/* LINKS HERE */}
              <Link to="/about"></Link>
            </li>
          </ul>
        </nav>

        <Routes>
          {/* ROUTES HERE */}
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  )
}



export default App
