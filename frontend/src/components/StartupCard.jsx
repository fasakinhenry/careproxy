import React, { useState } from 'react';
import { Globe, Link, Users, ChevronDown, ChevronUp } from 'lucide-react';

const StartupCard = ({ startup }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  // Check if description is long enough to need truncation
  const needsTruncation =
    startup.description && startup.description.length > 185;

  return (
    <div className='h-full' style={{ opacity: 1, transform: 'none' }}>
      <div className='rounded-lg text-card-foreground shadow-sm h-full relative overflow-hidden group hover:shadow-lg transition-all duration-300 bg-white border border-gray-100'>
        <div className='p-6 flex flex-col h-full'>
          <div className='mb-3'>
            <span className='inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-rose-50 text-rose-700'>
              {startup.category}
            </span>
          </div>
          <h3 className='text-lg font-semibold text-gray-900 min-h-[3.5rem] line-clamp-2'>
            {startup.name}
          </h3>
          <div className='mb-4'>
            <div className='relative'>
              <p
                className={`text-sm text-gray-600 leading-relaxed ${
                  isExpanded ? '' : 'min-h-[4.5rem] line-clamp-3'
                }`}
              >
                {isExpanded || !needsTruncation
                  ? startup.description
                  : `${startup.description.substring(0, 187)}...`}
              </p>
              {needsTruncation && (
                <button
                  onClick={toggleDescription}
                  className='text-xs text-emerald-600 hover:text-emerald-700 transition-colors mt-1 flex items-center gap-1'
                >
                  {isExpanded ? (
                    <>
                      Read less
                      <ChevronUp className='w-4 h-4' />
                    </>
                  ) : (
                    <>
                      Read more
                      <ChevronDown className='w-4 h-4' />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
          <div className='flex items-center gap-2 mb-4'>
            <Users className='text-gray-400 flex-shrink-0 w-4 h-4' />{' '}
            <p className='text-sm text-gray-600 truncate'>{startup.founders}</p>
          </div>
          <div className='flex items-center gap-4 pt-3 border-t border-gray-100 mt-auto'>
            <a
              href={startup.website}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700 transition-colors'
            >
              <Globe className='w-4 h-4' />
              <span>Website</span>
            </a>
            <a
              href={startup.linkedin}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-1.5 text-sm text-[#0A66C2] hover:text-[#0A66C2] transition-colors'
            >
              <Link className='w-4 h-4' />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupCard;
