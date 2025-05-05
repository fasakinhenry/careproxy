import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import StartupCard from './components/StartupCard';

const dummyData = [
  {
    name: 'The Kenko Life',
    category: 'Nutrition & Diet',
    description:
      "Delivers healthy, pre-prepared meals to customers' doorsteps...",
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
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <Hero />
      <CategoryFilter />
      <div className="px-6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyData.map((startup, index) => (
          <StartupCard key={index} startup={startup} />
        ))}
      </div>
    </div>
  );
}

export default App;
