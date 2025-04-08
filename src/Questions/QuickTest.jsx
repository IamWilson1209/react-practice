import React, { useState, useEffect, useLayoutEffect } from 'react';
import './QuickTest.css';

// const arr = Array.from(data);
// console.log(arr);

// const arr2 = [...data];
// console.log(arr2);

const data = { 1: 'a', 2: 'b', 3: 'c' };
const entries = Object.entries(data);
const entries2 = Object.keys(data);
const entries3 = Object.values(data);
console.log(entries, entries2, entries3);

const JavaScriptObj = { name: 'name', title: 'title', image: '' };
const JSONStringData = JSON.stringify(JavaScriptObj);
const JSONData = JSON.parse(JSONStringData);

const QuickTest = () => {
  const [count, setCount] = useState(0);

  /* 畫面不會重新快速渲染 */
  useLayoutEffect(() => {
    if (count === 0) {
      const rand = 1 + Math.floor(Math.random() * 1000);
      setCount(rand);
    }
  }, [count]);

  return (
    <>
      <div className={'items'}>
        {/* JavaScript Object */}
        <div>
          JavaScript Object:{' '}
          <span className={'red-text'}>{JavaScriptObj.name}</span>
        </div>
        {/* JSON String Data */}
        <div>JSON String Data {JSONStringData.title}</div>
        {/* JSON Data */}
        <div>JSON: {JSONData.name}</div>
        <div onClick={() => setCount(0)}>{count}</div>
      </div>

      <div className="separate">separater</div>

      <div className={'items2'}>
        <div className={'obj1'}>Object1</div>
        <div className={'obj2'}>Object2</div>
        <div className={'obj3'}>Object3</div>
      </div>
      <div className="separate">separater</div>
      <div className={'views'}>views</div>
    </>
  );
};

export default QuickTest;
