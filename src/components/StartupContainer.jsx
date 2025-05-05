import React from 'react';
import StartupCard from './StartupCard';

const StartupContainer = ({ startups }) => {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {startups.map((startup, index) => (
          <StartupCard key={index} startup={startup} />
        ))}
      </div>
    </main>
  );
};

export default StartupContainer;
