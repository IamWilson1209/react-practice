import React, { useState, useEffect, useLayoutEffect } from 'react';

// const arr = Array.from(data);
// console.log(arr);

// const arr2 = [...data];
// console.log(arr2);

const data = { 1: 'a', 2: 'b', 3: 'c' };
const entries = Object.entries(data);
const entries2 = Object.keys(data);
const entries3 = Object.values(data);
console.log(entries, entries2, entries3);

const QuickTest = () => {
  const [count, setCount] = useState(0);

  /* 畫面不會重新快速渲染 */
  useLayoutEffect(() => {
    if (count === 0) {
      const rand = 1 + Math.floor(Math.random() * 1000);
      setCount(rand);
    }
  }, [count]);

  return <div onClick={() => setCount(0)}>{count}</div>;
};

export default QuickTest;
