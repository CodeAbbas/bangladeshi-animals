import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

/**
 * Reusable Filter Modal
 * @param {{
 * isOpen: boolean,
 * onClose: () => void,
 * statuses: string[],
 * activeStatus: string,
 * onStatusChange: (status: string) => void,
 * onClear: () => void
 * }} props
 */
const FilterModal = ({
  isOpen,
  onClose,
  statuses,
  activeStatus,
  onStatusChange,
  onClear
}) => {
  
  const handleClearAndClose = () => {
    onClear();
    onClose();
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          />
          
          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-md bg-white rounded-xl shadow-2xl overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="filter-modal-title"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 pb-4">
              <h2 id="filter-modal-title" className="text-xl font-semibold text-gray-800">
                Filters
              </h2>
              <button onClick={onClose} aria-label="Close modal" className="-mt-1 -mr-1 p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-bangla-green">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 pb-6">
              <fieldset>
                <legend className="block text-sm font-medium text-gray-700 mb-3">
                  Conservation Status
                </legend>
                <div className="space-y-2">
                  {statuses.map((status) => {
                    const isActive = activeStatus === status;
                    return (
                      <label
                        key={status}
                        htmlFor={status}
                        className={`flex items-center justify-between w-full p-3 rounded-lg border cursor-pointer transition-all ${isActive ? 'bg-green-50 border-bangla-green ring-1 ring-bangla-green' : 'bg-white border-gray-300 hover:bg-gray-50'}`}
                      >
                        <input
                          type="radio"
                          id={status}
                          name="conservationStatus"
                          value={status}
                          checked={isActive}
                          onChange={() => onStatusChange(status)}
                          className="sr-only"
                        />
                        <span className={`font-medium ${isActive ? 'text-bangla-green' : 'text-gray-700'}`}>
                          {status === 'all' ? 'All' : status}
                        </span>
                        <span
                          className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all ${isActive ? 'bg-bangla-green border-bangla-green' : 'bg-white border-gray-400'}`}
                        >
                          {isActive && (
                            <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
                          )}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            </div>
            
            {/* Footer */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-3 p-4 bg-gray-50 border-t border-gray-200">
              <button
                onClick={handleClearAndClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-bangla-green focus:ring-offset-1"
              >
                Clear All
              </button>
              <button 
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 bg-bangla-green text-black font-medium rounded-lg shadow-md hover:bg-bangla-green-dark focus:outline-none focus:ring-2 focus:ring-bangla-green focus:ring-offset-2"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterModal;