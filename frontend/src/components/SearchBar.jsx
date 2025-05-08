import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    const query = e.target.value;
    setValue(query);
    onSearch(query);
  };

  return (
    <div className='relative'>
      <FiSearch className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10' />
      <input
        type='text'
        value={value}
        onChange={handleChange}
        placeholder='Search innovative startups...'
        className='flex h-10 px-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-full pl-12 pr-4 py-6 border-2 border-emerald-600/30 bg-white/10 backdrop-blur-sm text-white placeholder:text-emerald-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent'
      />
    </div>
  );
};

export default SearchBar;
