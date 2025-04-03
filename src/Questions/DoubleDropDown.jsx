import React, { useState } from 'react';

const countries = [
  { name: 'Taiwan', value: 'TWD', cities: ['Taipei', 'Taichung'] },
  { name: 'USA', value: 'USD', cities: ['New York', 'Washington'] },
];

const DoubleDropDown = () => {
  const [countryIndex, setCountryIndex] = useState(-1);
  const [city, setCity] = useState('');

  return (
    <div className="App">
      <h2>Double Dropdown</h2>
      {/* 1st dropdown */}
      <select
        value={countryIndex}
        onChange={(e) => {
          console.log(e.target.value);
          const index = parseInt(e.target.value, 10);
          setCountryIndex(index);
          // setCity(''); // 重置城市選擇
        }}
      >
        <option value={-1}>Select a country</option>
        {countries.map((item, index) => {
          return (
            <option key={index} value={index}>
              {item.name}
            </option>
          );
        })}
      </select>

      {/* 2nd dropdown */}
      <select
        value={city}
        onChange={(e) => {
          console.log(e.target.value);
          setCity(e.target.value);
        }}
      >
        <option value="">Select a city</option>
        {countryIndex >= 0 && countries[countryIndex] ? (
          countries[countryIndex].cities.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })
        ) : (
          <option value="">No country selected</option>
        )}
      </select>
    </div>
  );
};

export default DoubleDropDown;
