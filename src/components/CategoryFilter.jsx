const CategoryFilter = () => {
  return (
    <div className='flex justify-between items-center px-6 mb-4 text-sm text-gray-600'>
      <p>
        Showing <span className='font-semibold text-green-600'>108</span> total
        startups
      </p>
      <button className='border px-3 py-1 rounded-md'>All Categories ⌄</button>
    </div>
  );
};

export default CategoryFilter;
