import React from "react";
import { FiExternalLink, FiLinkedin } from "react-icons/fi";

const StartupCard = ({ startup }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm flex flex-col justify-between">
      <span className="text-xs bg-red-100 text-red-600 rounded px-2 py-0.5 w-max mb-2">{startup.category}</span>
      <h2 className="font-semibold text-md mb-1">{startup.name}</h2>
      <p className="text-sm text-gray-600 line-clamp-4 mb-3">{startup.description}</p>
      <div className="text-sm text-gray-700 mb-2">{startup.founders}</div>
      <div className="flex items-center gap-4 text-sm text-green-600">
        <a href={startup.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
          <FiExternalLink /> Website
        </a>
        <a href={startup.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
          <FiLinkedin /> LinkedIn
        </a>
      </div>
    </div>
  );
};

export default StartupCard;
