import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./components/store/store.js"; // Redux Store
import './index.css';

// Admin Components
import AdminHomePage from "./components/admin/home";
import FigurineDashboard from "./components/admin/figurine";
import ManufacturerDashboard from "./components/admin/manufacturer";
import PromoDashboard from "./components/admin/promo";

// User / Non-User Components
import Home from "./components/pages/home";
import About from "./components/pages/about";
import Signup from "./components/pages/signup";
import Favorites from "./components/pages/favorites";
import Details from "./components/pages/figurineDetail.jsx";
function App() {
  return (
    <Provider store={store}>
  
        <Router>
          <div>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/signup" element={<Signup />} />

              <Route path="/user/favorite" element={<Favorites />} />
              <Route path="/figurine/detail" element={<Details />} />
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminHomePage />} />
              <Route path="/admin/figurines" element={<FigurineDashboard />} />
              <Route path="/admin/manufacturers" element={<ManufacturerDashboard />} />
              <Route path="/admin/promos" element={<PromoDashboard />} />
            </Routes>
          </div>
        </Router>

    </Provider>
  );
}

export default App;
