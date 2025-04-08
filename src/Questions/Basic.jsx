import React from 'react';
import ArrayManipulation from './ArrayManipulation';

const Basic = () => {
  /* 
    1. 創建一個無法修改函式內部secret的function 
  */
  const Fn = () => {
    const secret = 'secret';
    return () => secret;
  };

  const getSecret = Fn();
  console.log('getSecret(): ', getSecret());

  /* 
    2. Shallow Clone 物件 
  */
  let obj = { a: 1, b: 2 };
  console.log('origin obj: ', obj);

  let obj2 = { ...obj, c: 3 };
  console.log('obj2: ', obj2);

  let obj3 = Object.assign({ d: 4 }, obj);
  console.log('obj3: ', obj3);

  /* Deep Clone */

  // function、HTML 的元素，這些是無法序列化的
  let obj4 = JSON.parse(JSON.stringify(obj));
  console.log(obj4);

  let obj5 = structuredClone(obj);
  console.log(obj5);

  /* 
    3. 數有多少 a, e, i, o, u
  */
  const findVowel = (str) => {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    return str
      .toLowerCase()
      .split('')
      .reduce((acc, item) => (vowels.includes(item) ? acc++ : acc), 0);
  };
  console.log(findVowel('fwhqiofhwioq'));

  /* 
    4. reverse each word in sentence
  */
  const str = 'Welcome to this JavaScript Guide!';
  /* 反轉字順序 */
  const reverseStr = (str) => str.split(' ').reverse().join(' ');
  /* 反轉字順序 + 單字順序 */
  const reverseStr2 = (str) => {
    const reverseArray = str
      .split(' ')
      .map((word) => word.split('').reverse().join(''))
      .join(' ');
    return reverseArray;
  };
  /* 全部反轉 */
  const reverseStr3 = (str) => {
    const reverseArray = str
      .split(' ')
      .map((word) => word.split('').reverse().join(''))
      .reverse()
      .join(' ');
    return reverseArray;
  };
  console.log('reverseStr: ', reverseStr(str));
  console.log('reverseStr2: ', reverseStr2(str));
  console.log('reverseStr3: ', reverseStr3(str));

  /* 5. 回傳最常出現的字 */
  const mostCommonString = (strings) => {
    const objs = {};
    strings.forEach((str) => {
      if (objs[str] === undefined) {
        objs[str] = 1;
      } else {
        objs[str]++;
      }
    });

    let maxEntry;
    let maxValue = 0;
    for (let obj in objs) {
      if (objs[obj] > maxValue) {
        maxValue = objs[obj];
        maxEntry = obj;
      }
    }
    return maxEntry;
  };

  /* 偏難 */
  const advMostCommonString = (strings) => {
    const result = strings.reduce((stringKey, item) => {
      if (stringKey[item]) {
        stringKey[item]++;
      } else {
        stringKey[item] = 1;
      }
      return stringKey;
    }, {});
    return Object.entries(result).reduce(
      (acc, el) => (el[1] > acc[1] ? el : acc),
      [null, 0]
    )[0];
  };

  console.log(mostCommonString(['a', 'b', 'c', 'c']));
  console.log(advMostCommonString(['a', 'b', 'c', 'c']));

  const person = {
    name: 'wilson',
    age: 25,
    printInfo: function () {
      console.log(`I am ${this.name}, age ${this.age}`);
    },
  };

  person.printInfo();

  /* 陣列平坦化，原生JS */
  let array = [1, 2, , [3, [4, 5, [6, 7, [8]]]]];
  console.log(array.flat(Infinity));

  /* 遞迴 */
  function flatten(arr, output = []) {
    for (const val of arr) {
      if (Array.isArray(val)) {
        flatten(val, output);
      } else {
        output.push(val); // 是元素就push入陣列
      }
    }
    return output;
  }

  /* reduce */
  function reduceFlatten(arr) {
    arr.reduce(
      (acc, cur) =>
        Array.isArray(cur) ? [...acc, ...reduceFlatten(cur)] : [...acc, cur],
      []
    );
  }
  const flattenArray = flatten(array);
  console.log(flattenArray);

  /* array 去重複 */
  const dup = [1, 1, 2, 2, 3];
  function removeDup(arr) {
    return Array.from(new Set(arr));
  }
  function removeDup2(arr) {
    return [...new Set(array)];
  }
  return <h2>Basic</h2>;
};

export default Basic;
