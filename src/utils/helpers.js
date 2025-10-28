/**
 * Gets Tailwind CSS color classes based on conservation status
 * @param {string} status - Conservation status
 * @returns {string} Tailwind classes
 */
export const getStatusClasses = (status) => {
  switch (status.toLowerCase()) {
    case "critically endangered":
      return "bg-red-700 text-white";
    case "endangered":
      return "bg-red-500 text-white";
    case "vulnerable":
      return "bg-yellow-500 text-gray-900";
    case "near threatened":
      return "bg-yellow-300 text-gray-900";
    case "least concern":
      return "bg-green-500 text-white";
    case "data deficient":
      return "bg-gray-400 text-gray-900";
    default:
      return "bg-gray-300 text-gray-800";
  }
};

/**
 * Truncates text to a specified length
 * @param {string} text - The text to truncate
 * @param {number} length - The max length
 * @returns {string} Truncated text
 */
export const truncateText = (text, length = 100) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
};