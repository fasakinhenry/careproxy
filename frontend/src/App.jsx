import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryFilter from './components/CategoryFilter';
import StartupContainer from './components/StartupContainer';
import Footer from './components/Footer.jsx';

function App() {
  const [categories, setCategories] = useState([]);
  const [startups, setStartups] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const categoriesResponse = await fetch(`${BASE_URL}/api/categories`);
        if (!categoriesResponse.ok)
          throw new Error('Failed to fetch categories');
        const categoriesData = await categoriesResponse.json();
        if (categoriesData.success && Array.isArray(categoriesData.data)) {
          setCategories(categoriesData.data.filter((cat) => cat !== 'all'));
        }

        const startupsResponse = await fetch(`${BASE_URL}/api/startups`);
        if (!startupsResponse.ok) throw new Error('Failed to fetch startups');
        const startupsData = await startupsResponse.json();
        if (startupsData.success && Array.isArray(startupsData.data)) {
          setStartups(startupsData.data);
        }
      } catch (error) {
        if (import.meta.env.DEV) console.error('Error fetching data:', error);
        setCategories([]);
        setStartups([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [BASE_URL]);

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredStartups = startups.filter((startup) => {
    const inCategory =
      selectedCategory === 'all' || startup.category === selectedCategory;

    const inSearch =
      startup.name.toLowerCase().includes(searchQuery) ||
      (startup.description &&
        startup.description.toLowerCase().includes(searchQuery)) ||
      (startup.tags &&
        startup.tags.some((tag) => tag.toLowerCase().includes(searchQuery))) ||
      (startup.founders &&
        startup.founders.some((founder) =>
          founder.toLowerCase().includes(searchQuery)
        ));

    return inCategory && inSearch;
  });

  return (
    <div className='bg-gray-50 min-h-screen'>
      <Navbar />
      <Hero onSearch={handleSearch} />
      <CategoryFilter
        categories={['all', ...categories]}
        selected={selectedCategory}
        onChange={handleCategoryChange}
        totalStartups={filteredStartups.length}
      />
      <StartupContainer startups={filteredStartups} isLoading={isLoading} />
      <Footer />
    </div>
  );
}

export default App;
