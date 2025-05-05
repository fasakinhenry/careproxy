import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryFilter from './components/CategoryFilter';
import StartupContainer from './components/StartupContainer';
import Footer from './components/Footer.jsx'

function App() {
  const [categories, setCategories] = useState([]);
  const [startups, setStartups] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch categories and startups on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const data = await response.json();
        console.log('Categories:', data);

        if (data.success && Array.isArray(data.data)) {
          setCategories(['all', ...data.data]);
        } else {
          throw new Error('Invalid categories response structure');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories(['all']); // fallback
      }
    };

    const fetchStartups = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/startups');
        if (!response.ok) {
          throw new Error('Failed to fetch startups');
        }

        const data = await response.json();
        console.log('Startups:', data);

        if (data.success && Array.isArray(data.data)) {
          setStartups(data.data);
        } else {
          throw new Error('Invalid startups response structure');
        }
      } catch (error) {
        console.error('Error fetching startups:', error);
        setStartups([]); // fallback
      }
    };

    fetchCategories();
    fetchStartups();
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
        categories={categories}
        selected={selectedCategory}
        onChange={handleCategoryChange}
      />
      <StartupContainer startups={filteredStartups} />
      <Footer />
    </div>
  );
}

export default App;
