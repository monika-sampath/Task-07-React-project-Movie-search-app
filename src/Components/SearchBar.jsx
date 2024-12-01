import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");

  const handleSearch = () => {
    onSearch(query, type);
  };

  return (
    <div className="flex gap-4 items-center">
      <input
        type="text"
        className="border rounded-md p-2 w-full"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select
        className="border rounded-md p-2"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">All</option>
        <option value="movie">Movies</option>
        <option value="series">Series</option>
        <option value="episode">Episodes</option>
      </select>
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
