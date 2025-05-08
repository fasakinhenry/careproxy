import React from 'react';
import SearchBar from './SearchBar';

const Hero = ({ onSearch }) => {
  return (
    <section className='relative bg-emerald-700 text-white'>
      <div
        className='absolute inset-0 bg-cover bg-center mix-blend-overlay'
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1527856263669-12c3a0af2aa6?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}
      ></div>
      <div className='relative container mx-auto px-4 py-16 sm:py-24'>
        <div className='max-w-3xl mx-auto text-center space-y-8'>
          <h1 className='text-4xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-md'>
            Discover Healthcare Startups
          </h1>
          <p className='text-lg sm:text-xl text-emerald-50 max-w-2xl mx-auto'>
            Explore the future of healthcare through groundbreaking startups
            that are revolutionizing patient care and overall wellbeing!
          </p>
          <div className='max-w-2xl mx-auto mt-8'>
            <SearchBar onSearch={onSearch} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
