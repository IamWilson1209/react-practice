import React, { useEffect, useRef, useState } from 'react';

const PhoneNumberInput = ({ maxLength = 10 }) => {
  const [text, setText] = useState('');
  const inputRef = useRef(null);
  const positionRef = useRef(0);

  const handleInputChange = (e) => {
    /* 最新輸入值 */
    const currentValue = e.target.value;

    /* 光標起始位置 */
    const selectionStart = e.target.selectionStart;

    /* 過濾掉非數字 */
    const numbers = currentValue.replace(/[^0-9]/g, '');

    /* 字串大小 */
    const size = numbers.length;

    /* 不符合長度，回傳 */
    if (size > maxLength) return;

    const formatedValue = [];

    /* 對原本的input使用for迴圈 */
    for (let i = 0; i < size; i++) {
      /* 開頭 */
      if (size > 3 && i === 0) {
        formatedValue.push('(');
      }

      /* 0, 1, 2 */
      formatedValue.push(numbers[i]);

      /* 2之後 */
      if (size > 3 && i === 2) {
        formatedValue.push(')');
      }

      /* 第6位數 */
      if (size > 6 && i === 5) {
        formatedValue.push('-');
      }
    }

    /* 但我註解掉也沒怎樣，可能不一定要用? */
    const diff = formatedValue.length - currentValue.length;
    if (selectionStart) {
      positionRef.current = selectionStart + diff;
    }

    setText(formatedValue.join(''));
  };

  useEffect(() => {
    /* input ref 掛載後設置 */
    if (inputRef.current) {
      inputRef.current.setSelectionRange(
        positionRef.current, // start
        positionRef.current // end
      );
    }
  }, [text]);

  return (
    <div>
      <input
        value={text} /* 使用useState跟蹤 */
        type="text"
        ref={inputRef} /* 追蹤 */
        placeholder="phone number..."
        onChange={handleInputChange}
      />
    </div>
  );
};

export const ThirdQuestion = () => {
  return (
    <div>
      <h2>Phone Number typer</h2>
      <PhoneNumberInput maxLength={10} />
    </div>
  );
};
export default ThirdQuestion;
