import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { Filter } from 'lucide-react';

const CategoryFilter = ({ categories = [], selected, onChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(selected || 'all');

  const handleCategoryChange = (newValue) => {
    setSelectedCategory(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className='bg-white border-b border-gray-200'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <p className='text-sm text-gray-600'>
            Showing <span className='font-semibold text-emerald-600'>108</span>{' '}
            total startups
          </p>
          <div className='flex items-center space-x-3'>
            <Filter className='text-emerald-600 hidden sm:block' />
            <Select
              value={selectedCategory}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger
                role='combobox'
                aria-expanded={selectedCategory !== 'all'}
                className='flex h-10 items-center justify-between rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[150px] border-emerald-200'
              >
                <span style={{ pointerEvents: 'none' }}>
                  {selectedCategory === 'all'
                    ? 'All Categories'
                    : selectedCategory}
                </span>
              </SelectTrigger>

              <SelectContent className='max-h-60 overflow-y-auto'>
                <SelectItem value='all'>All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
