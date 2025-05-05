import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryFilter from './components/CategoryFilter';
import StartupContainer from './components/StartupContainer';

// Dummy data for startups (this should be fetched from an API too in the real world)
const dummyData = [
  {
    name: 'The Kenko Life',
    category: 'Nutrition & Diet',
    description:
      "The Kenko Life delivers healthy, pre-prepared meals daily to customers' doorsteps. Their target market is health-conscious individuals seeking convenient, nutritionally balanced food. A key differentiator is their daily-changing menu, avoiding meal repetition for 26 days. They offer free consultations with a nutritionist.",
    founders: 'Neeraj Kumar Yadav, Vivek Chandran',
    website: '#',
    linkedin: '#',
  },
  {
    name: 'Allo Health',
    category: 'Sexual Health',
    description: 'Clinic for erectile dysfunction, premature ejaculation...',
    founders: 'Pranay Jivrajka',
    website: '#',
    linkedin: '#',
  },
];

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Fetch categories from an API (replace with your real API endpoint)
    fetch('https://api.example.com/categories')
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data returned is an array of categories
        setCategories(['all', ...data]);  // Add 'all' as the default category
      })
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
  };

  // Filter the startups based on selected category
  const filteredStartups = selectedCategory === 'all'
    ? dummyData
    : dummyData.filter((startup) => startup.category === selectedCategory);

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
    </div>
  );
}

export default App;
