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
  const [isLoading, setIsLoading] = useState(true);

  // Fetch categories and startups on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch categories
        const categoriesResponse = await fetch('http://localhost:5000/api/categories');
        if (!categoriesResponse.ok) {
          throw new Error('Failed to fetch categories');
        }
        
        const categoriesData = await categoriesResponse.json();
        console.log('Categories:', categoriesData);
        
        if (categoriesData.success && Array.isArray(categoriesData.data)) {
          setCategories(categoriesData.data.filter(cat => cat !== 'all')); // Filter out 'all' if it exists in API response
        } else {
          throw new Error('Invalid categories response structure');
        }
        
        // Fetch startups
        const startupsResponse = await fetch('http://localhost:5000/api/startups');
        if (!startupsResponse.ok) {
          throw new Error('Failed to fetch startups');
        }
        
        const startupsData = await startupsResponse.json();
        console.log('Startups:', startupsData);
        
        if (startupsData.success && Array.isArray(startupsData.data)) {
          setStartups(startupsData.data);
        } else {
          throw new Error('Invalid startups response structure');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Set fallbacks
        setCategories([]);
        setStartups([]);
      } finally {
        // Set loading to false after all data is fetched (or failed)
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle category change
  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
  };

  // Filter startups based on selected category
  const filteredStartups =
    selectedCategory === 'all'
      ? startups
      : startups.filter((startup) => startup.category === selectedCategory);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <Hero />
      <CategoryFilter
        categories={['all', ...categories]}
        selected={selectedCategory}
        onChange={handleCategoryChange}
      />
      <StartupContainer 
        startups={filteredStartups} 
        isLoading={isLoading} 
      />
      <Footer />
    </div>
  );
}

export default App;
