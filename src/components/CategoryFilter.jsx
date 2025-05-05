import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';

const CategoryFilter = ({ categories = [], selected, onChange }) => {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-emerald-600">108</span> total startups
          </p>
          <div className="flex items-center space-x-3">
            <Filter className="text-emerald-600 hidden sm:block" />
            <button
              type="button"
              role="combobox"
              aria-controls="category-dropdown"
              aria-expanded={selected !== 'all'}
              aria-autocomplete="none"
              className="flex h-10 items-center justify-between rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[150px] border-emerald-200"
            >
              <span style={{ pointerEvents: 'none' }}>
                {selected === 'all' ? 'All Categories' : selected}
              </span>
              <ChevronDown className="h-4 w-4 opacity-50" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
