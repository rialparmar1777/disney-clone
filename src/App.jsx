import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Components/Home/Home";
import Search from "./Components/Search/Search";
import Watchlist from "./Components/Watchlist/Watchlist";
import Movies from "./Components/Movies/Movies";
import Series from "./Components/Series/Series";
import Originals from "./Components/Originals/Originals";
import ThemeToggle from "./Components/ThemeToggle"; // Import ThemeToggle

function App() {
  return (
    <Router>
      <Navbar />
      <ThemeToggle /> {/* Add ThemeToggle button */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home at the root path */}
        <Route path="/search" element={<Search />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/originals" element={<Originals />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
