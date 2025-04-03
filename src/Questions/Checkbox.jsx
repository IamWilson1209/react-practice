import React, { useState } from 'react';

const arr = ['item1', 'item2', 'item3'];

const Checkbox = () => {
  const [array, setArray] = useState(arr);
  const [checkedItems, setCheckedItems] = useState(new Set());

  const handleCheckbox = (e, item) => {
    const isChecked = e.target.checked;
    setCheckedItems((prev) => {
      const newCheckItems = new Set(prev);
      if (isChecked) {
        newCheckItems.add(item);
      } else {
        newCheckItems.delete(item);
      }
      return newCheckItems;
    });
  };

  const handleOnDelete = () => {
    /*  
      對於每個item，true才會在新陣列，
      過濾掉：!checkedItems.has(item)是false的選項 
    */
    const newArray = array.filter((item) => {
      return !checkedItems.has(item);
    });
    setArray(newArray);
    setCheckedItems(new Set());
  };

  return (
    <div>
      <h2>Checkbox</h2>
      <ul>
        {array.map((item, index) => {
          return (
            <li key={index}>
              <input
                type="checkbox"
                onChange={(e, index) => handleCheckbox(e, item)}
                checked={checkedItems.has(item)}
              />
              {item}
            </li>
          );
        })}
      </ul>
      <button onClick={handleOnDelete}>delete</button>
    </div>
  );
};

export default Checkbox;
