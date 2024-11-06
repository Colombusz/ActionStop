import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './index.css';

// Import Provider and Redux store
import { Provider } from 'react-redux';
import store from './components/store/store.js';  // Make sure your store is correctly exported from store/store.js

// Admin

// User
import About from './components/pages/about';
import Home from './components/pages/home';

function App() {
  return (
    <Provider store={store}>  {/* Wrap the entire app with the Provider */}
      <Router>
        <div>
          <nav>
            
             
                {/* Provide text or labels for the Links */}
                {/* <Link to="/about">About</Link>
             
             
                <Link to="/home">Home</Link> */}
             
            
          </nav>

          <Routes>
            {/* Define the routes here */}
            <Route path="/about" element={<About />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
