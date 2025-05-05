const StartupCard = ({ title, category, description, founders, links }) => {
  return (
    <div className='bg-white p-4 rounded-xl shadow-sm border max-w-sm'>
      <span className='text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full inline-block mb-2'>
        {category}
      </span>
      <h2 className='font-bold text-lg mb-2'>{title}</h2>
      <p className='text-sm text-gray-600 mb-2'>{description}</p>
      <a href='#' className='text-green-600 text-xs'>
        Read more →
      </a>
      <p className='mt-3 text-sm text-gray-500'>{founders}</p>
      <div className='flex gap-4 mt-2 text-xs text-green-600'>
        {links.website && <a href={links.website}>🌐 Website</a>}
        {links.linkedin && <a href={links.linkedin}>🔗 LinkedIn</a>}
      </div>
    </div>
  );
};

export default StartupCard;
