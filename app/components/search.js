'use client';

import { useState } from 'react';

export default function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <section className="flex items-center justify-center space-x-2 w-full">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        className="w-1/3 p-2 border border-gray-300 rounded text-black"
        placeholder="Search"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded">
        Search
      </button>
    </section>
  );
}
