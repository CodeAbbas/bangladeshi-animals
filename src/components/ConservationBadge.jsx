import React from 'react';
import { getStatusClasses } from '../utils/helpers';

/**
 * Conservation Status Badge Component
 * @param {{status: string}} props
 */
const ConservationBadge = ({ status }) => {
  const statusClasses = getStatusClasses(status);
  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${statusClasses}`}
    >
      {status}
    </span>
  );
};

export default ConservationBadge;