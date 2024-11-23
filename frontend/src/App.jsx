import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';

// Utility Components
import { Vortex } from './components/ui/vortex.jsx';
import { Modal } from './components/ui/animated-modal.jsx';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

// Redux Provider and Store
import { Provider } from 'react-redux';
import store from './components/store/store.js';

// Admin Pages
import AdminHomePage from './components/admin/home';
import FigurineDashboard from './components/admin/figurine.jsx';
import ManufacturerDashboard from './components/admin/manufacturer.jsx';
import PromoDashboard from './components/admin/promo.jsx';

// User / Non-User Pages
import Home from './components/pages/home';
import About from './components/pages/about';
import Signup from './components/pages/signup';
import Login from './components/pages/login';
import Favorites from './components/pages/favorites';
<<<<<<< HEAD

// User Authentication
import { checkAuthStatus, handleLogout } from './utils/userauth.js';

=======
import Checkout from './components/pages/checkout.jsx';
>>>>>>> fac15ec (partial shi- for checkout)
function App() {
  // Authentication
  const [isAuthenticated, setIsAuthenticated] = useState(() => checkAuthStatus);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
  const [isadmin, setAdmin] = useState(() => localStorage.getItem('isadmin') === 'true');

  const handleLogin = (userData) => {
    setIsAuthenticated(true); 
    setUser(userData);
    setAdmin(userData.isAdmin);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('isAdmin', userData.isAdmin.toString());
  };

  return (
    <Provider store={store}>
      <Router
        future={{
          v7_startTransition: true, // Enable React.startTransition for smoother updates
          v7_relativeSplatPath: true, // Enable updated relative splat path resolution
        }}
      >
        <Vortex
            rangeY={800}
            particleCount={500}
            baseHue={120}
          />
        <Modal>
          <ToastContainer />
          <div className="relative z-10">
            <Routes>
              {/* User / Non-User Routes */}
              <Route path="/about" element={<About />} />
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/user/favorite" element={<Favorites />} />
              <Route path="/user/checkout" element={<Checkout />} />
              {/* <Route path="/figurine/detail" element={<Details />} /> */}

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminHomePage />} />

              <Route path="/admin/figurines" element={<FigurineDashboard />} />
              <Route path="/admin/manufacturers" element={<ManufacturerDashboard />} />
              <Route path="/admin/promos" element={<PromoDashboard />} />
            </Routes>
          </div>
        </Modal>
      </Router>
    </Provider>
  );
}

export default App;
