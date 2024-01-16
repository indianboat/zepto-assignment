"use client";

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

const MultiSelect = ({ items }) => {

  const [isOpen, setIsOpen] = useState(false);
  const listItemsRef = useRef(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [removalIndex, setRemovalIndex] = useState(null);

  const handleItemBox = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (listItemsRef.current && !listItemsRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      handleBackspace(event);
    };


    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItems, focusedIndex]);


  const handleItemClick = (item) => {
    setSelectedItems([...selectedItems, item]);
    setFilterText('');
    setFocusedIndex(null);
  };

  const handleRemoveItem = (itemToRemove) => {
    const updatedItems = selectedItems.filter((item) => item !== itemToRemove);
    setSelectedItems(updatedItems);
  };

  const handleBackspace = (event) => {
    if (event.key === 'Backspace') {
      if (removalIndex === null) {
        // If the item is not already marked for removal, mark it
        setRemovalIndex(selectedItems.length - 1);
      } else {
        // Remove the item marked for removal
        handleRemoveItem(selectedItems[removalIndex]);
        setRemovalIndex(null); // Reset removal index after removal
      }
    }
    else if (event.key === 'Enter') {
      // If Enter is pressed, check if the filter text exactly matches any item
      const exactMatchIndex = items.findIndex(
        (item) => item.toLowerCase() === filterText.toLowerCase()
      );

      if (exactMatchIndex !== -1) {
        // If there's an exact match, add it
        handleItemClick(items[exactMatchIndex]);
      }
    }
  };

  useEffect(() => {
    const handleKeyUp = (event) => {
      if (event.key === 'Backspace') {
        // Reset removal index when Backspace key is released
        setRemovalIndex(null);
      }
    };

    document.addEventListener('keydown', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyUp);
    };
  }, [selectedItems, removalIndex]);

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(filterText.toLowerCase()) && !selectedItems.includes(item)
  );


  return (
    <>
      <div className="" ref={listItemsRef}>

        <div className="flex  items-center border rounded-lg shadow-md p-2">
          <div className="flex w-fit gap-3">
            {selectedItems.map((selectedItem, index) => (
              <div
                key={index}
                className={`${index === removalIndex ? 'bg-blue-800' : 'bg-blue-500'}  flex gap-3 items-center text-white p-2 rounded-md `}
              >
                {selectedItem}
                <span className='cursor-pointer' onClick={() => handleRemoveItem(selectedItem)}>&#10005;</span>
              </div>
            ))}
          </div>
          <input value={filterText} onKeyDown={handleBackspace} onChange={(e) => setFilterText(e.target.value)} className="w-full p-2 outline-none" onClick={handleItemBox} />
        </div>

        <AnimatePresence>
          {isOpen && filteredItems.length > 0 && (
            <motion.div
              className="left-0 w-full bg-white border rounded-md mt-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Render your list items here */}
              {filteredItems.map((item, index) => (
                <div key={item} onClick={() => handleItemClick(item)} className="p-2 hover:bg-gray-100">
                  {item}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default MultiSelect