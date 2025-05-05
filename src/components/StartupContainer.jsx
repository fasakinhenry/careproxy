import React from 'react';
import StartupCard from './StartupCard';

const StartupContainer = ({ startups }) => {
  return (
    <div className="px-6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {startups.map((startup, index) => (
        <StartupCard key={index} startup={startup} />
      ))}
    </div>
  );
};

export default StartupContainer;
