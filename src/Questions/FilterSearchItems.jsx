import React, { useState } from 'react';

const fruits = ['apple', 'banana', 'orange'];

const FirstQuestion = () => {
  const [fruitData, setFruitData] = useState(fruits);
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    console.log(searchTerm);
  };

  const filterFruitData = fruitData.filter((fruit) =>
    fruit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Filter Search Items</h2>
      <input type="text" placeholder="Search..." onChange={handleInputChange} />
      {filterFruitData.map((fruit, index) => {
        return <p key={index}>{fruit}</p>;
      })}
    </div>
  );
};

export default FirstQuestion;
