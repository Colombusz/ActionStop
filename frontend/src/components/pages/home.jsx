import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFigurines } from '../store/figurineSlice';
import ResponsiveFooter from '../common/footer';
import FigurineCard3d from '../common/figurineCard3d';
import MainNavbar from '../common/navbar';
import { Search } from 'lucide-react';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFigurines());
  }, [dispatch]);
  const { figurines, loading, error } = useSelector((state) => state.figurines);
  const [searchTerm, setSearchTerm] = useState("");
  const { classification, date, popularity, price, rating } = useSelector(
    (state) => state.figurines.filters
  );

  const filterFigurines = () => {
    // Start with the full list
    let filtered = figurines;

    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter((figurine) =>
        figurine.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply classification filter
    if (classification) {
      switch(classification) {
        case "Western":
          filtered = filtered.filter((figurine) => figurine.classification === "Western");
          break;
        case "Anime":
          filtered = filtered.filter((figurine) => figurine.classification === "Anime");
          break;
        case "Manga":
          filtered = filtered.filter((figurine) => figurine.classification === "Manga");
          break;
        case "Fantasy":
          filtered = filtered.filter((figurine) => figurine.classification === "Fantasy");
          break;
        case "Other":
          filtered = filtered.filter((figurine) => figurine.classification === "Other");
          break;

      }
    }

    // Apply date filter (assuming `figurine.date` is a Date object or ISO string)
    if (date) {
      const now = new Date();
      filtered = filtered.filter((figurine) => {
        switch (date) {
          case "today":
            return new Date(figurine.date).toDateString() === now.toDateString();
          case "old":
            return new Date(figurine.date) < now;
          case "month":
            return new Date(figurine.date).getMonth() === now.getMonth();
          default:
            return true;
        }
      });
    }

    // Apply popularity filter (e.g., most, lo-hi, hi-lo)
    if (popularity) {
      switch (popularity) {
        case "most":
          filtered = [...filtered].sort((a, b) => b.totalQty - a.totalQty);
          break;
        case "lo-hi":
          filtered = [...filtered].sort((a, b) => a.totalQty - b.totalQty);
          break;
        case "hi-lo":
          filtered = [...filtered].sort((a, b) => b.totalQty - a.totalQty);
          break;
        default:
          break;
      }
    }

    // Apply price filter (e.g., ranges like "50<", "50-200", "200-500", "500>")
    if (price) {
      filtered = filtered.filter((figurine) => {
        const figurinePrice = figurine.price;
        switch (price) {
          case "50<":
            return figurinePrice < 50;
          case "50-200":
            return figurinePrice >= 50 && figurinePrice <= 200;
          case "200-500":
            return figurinePrice > 200 && figurinePrice <= 500;
          case "500>":
            return figurinePrice > 500;
          default:
            return true;
        }
      });
    }

    // Apply rating filter (e.g., stars like 5, 4, 3)
    if (rating) {

      switch(rating) {
        case 5:
          filtered = filtered.filter((figurine) =>figurine.averageRating >= 4  && figurine.averageRating <= 5 );
          break;
        case 4:
          filtered = filtered.filter((figurine) => figurine.averageRating >= 3  && figurine.averageRating < 4);
          break;
        case 3:
          filtered = filtered.filter((figurine) =>figurine.averageRating < 3  && figurine.averageRating >= 1);
          break;
      }
    }



    return filtered;
  };

  const filteredFigurines = filterFigurines();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="home-page">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-black">
        <MainNavbar />
      </div>

      {/* Main Content */}
      <div className=" mt-24"> {/* Padding for navbar */}
        {/* Search Bar */}
        <div className="w-full px-4 py-4 bg-white dark:bg-black shadow-sm">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search figurines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
                          focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                          placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {loading && <p className="text-center text-lg text-blue-500">Loading...</p>}
        {error && <p className="text-center text-lg text-red-500">Error: {error}</p>}

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
          {Array.isArray(filteredFigurines) && filteredFigurines.length > 0 ? (
            filteredFigurines.map((figurine) => (
              <FigurineCard3d
                key={figurine._id}
                figurine={figurine}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">
              {searchTerm ? 'No figurines found matching your search.' : 'No Figurines found.'}
            </div>
          )}
        </div>

        <ResponsiveFooter />
      </div>
    </div>
  );
};

export default Home;