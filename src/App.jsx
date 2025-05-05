// src/App.jsx
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import StartupContainer from './components/StartupContainer';

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
  return (
    <div className='bg-gray-50 min-h-screen'>
      <Navbar />
      <Hero />
      <CategoryFilter />
      <StartupContainer startups={dummyData} />
    </div>
  );
}

export default App;
