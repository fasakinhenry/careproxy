/**
 * Highlights all instances of the search term in a given text.
 * Returns an array of React elements and strings.
 *
 * @param {string} text - Original text to highlight within.
 * @param {string} term - Search term to highlight.
 * @returns {Array} Array of strings and JSX <mark> elements.
 */
export default function highlightMatch(text, term) {
    if (!term || !text) return text;
  
    const regex = new RegExp(`(${term})`, 'gi');
    const parts = text.split(regex);
  
    return parts.map((part, index) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <mark key={index} className="bg-yellow-200 text-gray-900 rounded px-1">
          {part}
        </mark>
      ) : (
        part
      )
    );
  }
  