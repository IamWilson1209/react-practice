import React, { useState } from 'react';

const calls = [
  { name: 'wilson', numCalls: 5 },
  { name: 'wilson1', numCalls: 4 },
  { name: 'wilson2', numCalls: 3 },
  { name: 'wilson', numCalls: 2 },
  { name: 'wilson4', numCalls: 1 },
  { name: 'wilson2', numCalls: 8 },
  { name: 'wilson6', numCalls: 9 },
];

/* reduce()累加 */
const totalCallsPerPerson = calls.reduce((callsByName, item) => {
  const currentName = item.name;

  if (callsByName.hasOwnProperty(currentName)) {
    callsByName[currentName] = callsByName[currentName] + item.numCalls;
  } else {
    callsByName[currentName] = item.numCalls;
  }

  return callsByName; // return acc
}, {});

/* 物件用for迴圈丟進去 */
const sortedArray = [];
for (const name in totalCallsPerPerson) {
  sortedArray.push({ name: name, numCalls: totalCallsPerPerson[name] });
}

/* sort() */
sortedArray.sort((a, b) => {
  return a.numCalls - b.numCalls;
});

const ArrayManipulation = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  /* includes() */
  const filteredArray = sortedArray.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h2>Array Manipulation</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredArray.map((call, index) => {
        return (
          <li key={index}>
            {call.name}: {call.numCalls}
          </li>
        );
      })}
    </div>
  );
};
export default ArrayManipulation;
