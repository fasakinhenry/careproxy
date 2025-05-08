import React from 'react';
import StartupCard from './StartupCard';
import DNALoader from './DNALoader';

const StartupContainer = ({ startups, isLoading, searchQuery }) => {
  if (isLoading) return <DNALoader />;

  if (startups.length === 0) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center py-16'>
          <h3 className='text-lg font-medium text-gray-700 mb-2'>
            No startups found
          </h3>
          <p className='text-sm text-gray-500'>
            Try selecting a different category or check back later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className='container mx-auto px-4 py-12'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {startups.map((startup, index) => (
          <StartupCard
            key={`${startup.name}-${index}`}
            startup={startup}
            searchQuery={searchQuery}
          />
        ))}
      </div>
    </main>
  );
};

export default StartupContainer;
