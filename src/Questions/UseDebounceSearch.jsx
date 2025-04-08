import React, { useEffect, useState } from 'react';

/* custome  hook useDebounce(input, delay) */
const useDebounce = (text, delay) => {
  /* 定義初始狀態 */
  const [debounce, setDebounce] = useState(text);

  /* 使用useEffect觸發setTImeout delay修改 */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(text);
    }, delay);

    /* 返回給 React，下一次自動清除 */
    return () => {
      clearTimeout(timer);
    };
  }, [text, delay]);

  /* 回傳debounce text */
  return debounce;
};

const SecondQuestion = () => {
  const [text, setText] = useState('');
  const debounceText = useDebounce(text, 1000);

  return (
    <div>
      <h2>Debounce Hook Tester</h2>
      <input
        type="text"
        placeholder="search..."
        onChange={(e) => setText(e.target.value)}
      />
      <p>{debounceText}</p>
    </div>
  );
};

export default SecondQuestion;
