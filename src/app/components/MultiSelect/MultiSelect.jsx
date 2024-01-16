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
  };

  const handleEnter = () => {
    // If Enter is pressed, check if the filter text exactly matches any item
    const exactMatch = items.find(
      (item) => item.toLowerCase() === filterText.toLowerCase()
    );

    if (exactMatch) {
      handleItemClick(exactMatch);
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
      <div className="lg:w-[600px] md:w-[500px] sm:w-[500px] w-full" ref={listItemsRef}>

        <div className="flex flex-row justify-center gap-1 items-center rounded-lg shadow-md p-2 bg-white ring-2 ring-purple-900 dark:ring-neutral-300 dark:bg-neutral-700 w-full">
          <div className="flex flex-row flex-wrap w-full gap-3">
            {selectedItems.map((selectedItem, index) => (
              <div
                key={index}
                className={`${index === removalIndex && filterText == "" ? 'bg-purple-800 ring-1 ring-purple-950 ring-offset-2' : 'bg-purple-500'} flex gap-3 items-center text-white p-2 rounded-md`}
              >
                {selectedItem}
                <span className='cursor-pointer' onClick={() => handleRemoveItem(selectedItem)}>&#10005;</span>
              </div>
              
            ))}
            <input value={filterText} onKeyDown={(event) => { if (event.key == "Backspace" && filterText == '') { handleBackspace(event) } else if (event.key == "Enter") { handleEnter(event) } }} onChange={(e) => setFilterText(e.target.value)} className={`p-2 outline-none ${selectedItems.length > 0 ? 'w-fit' : 'w-full'} dark:bg-neutral-700`} onClick={handleItemBox} />
          </div>
            
          
        </div>

        <AnimatePresence>
          {isOpen && filteredItems.length > 0 && (
            <motion.div
              className="left-0 w-full bg-gray-200 shadow-lg dark:bg-gray-700 rounded-xl mt-2 p-1 overflow-auto h-fit max-h-40"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Render your list items here */}
              {filteredItems.map((item, index) => (
                <div key={index} onClick={() => handleItemClick(item)} className="p-2 hover:bg-gray-300 dark:hover:bg-slate-500 cursor-pointer rounded-lg">
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