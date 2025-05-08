export function highlightMatch(text, query) {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className='bg-yellow-200 text-black rounded px-1'>
        {part}
      </mark>
    ) : (
      part
    )
  );
}
