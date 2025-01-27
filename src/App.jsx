import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Components/Auth/AuthContext"; // Import AuthProvider
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Components/Home/Home";
import Search from "./Components/Search/Search";
import Watchlist from "./Components/Watchlist/Watchlist";
import Movies from "./Components/Movies/Movies";
import Series from "./Components/Series/Series";
import Originals from "./Components/Originals/Originals";
import MyAccount from "./Components/MyAccount/MyAccount";
import Settings from "./Components/Settings/Settings";
import Login from "./Components/Login/Login";


function App() {
  return (
    <AuthProvider> {/* Wrap the entire app with AuthProvider */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home at the root path */}
          <Route path="/search" element={<Search />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/series" element={<Series />} />
          <Route path="/originals" element={<Originals />} />
          <Route path="/account" element={<MyAccount />} /> {/* Account page */}
          <Route path="/login" element={<Login />} /> {/*Login Page */}
          <Route path="/settings" element={<Settings />} /> {/* Settings page */}
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
