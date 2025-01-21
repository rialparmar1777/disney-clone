import React, { useState } from "react";
import "./Search.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Simulate search results
    setSearchResults([
      {
        id: 1,
        title: "The Lion King",
        image: "https://via.placeholder.com/300x200?text=Lion+King",
      },
      {
        id: 2,
        title: "Frozen",
        image: "https://via.placeholder.com/300x200?text=Frozen",
      },
      {
        id: 3,
        title: "Avengers: Endgame",
        image: "https://via.placeholder.com/300x200?text=Avengers",
      },
    ]);
  };

  return (
    <div className="search-page">
      <div className="search-container">
        <h1>Search for Your Favorite Movies and Shows</h1>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Type to search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <div className="trending">
          <h2>Trending Searches</h2>
          <div className="trending-tags">
            <span>Frozen</span>
            <span>Avengers</span>
            <span>Star Wars</span>
            <span>The Mandalorian</span>
            <span>Encanto</span>
          </div>
        </div>
      </div>
      {searchResults.length > 0 && (
        <div className="results-container">
          <h2>Search Results</h2>
          <div className="results-grid">
            {searchResults.map((result) => (
              <div key={result.id} className="result-card">
                <img src={result.image} alt={result.title} />
                <p>{result.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
