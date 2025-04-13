import { useState, useEffect, useRef } from 'react';

/* 
  用array管理state
  setInterval定時更新組件進度
  可選useRef或const作為timerId，時間到清除
  setInterval內綁定函式，更新進度比例
*/

export default function App() {
  const [bar, setBar] = useState([]);

  const handleOnClick = () => {
    const newBar = {
      id: Date.now(),
      progress: 0,
    };
    setBar((prev) => [...prev, newBar]);
  };

  return (
    <div className="app">
      <button onClick={handleOnClick}>Add</button>
      <div className="progress-container">
        {bar.map((item) => (
          <ProgressBar key={item.id} id={item.id} />
        ))}
      </div>
    </div>
  );
}

const ProgressBar = ({ id }) => {
  const [progress, setProgress] = useState(0);

  /* useRef不會觸發重新渲染 */
  const timeRef = useRef(null);

  useEffect(() => {
    const duration = 2000;
    const update = 16;
    const increment = 100 / (duration / update);

    /* 用useRef去鉤定時器，每16毫秒計時一次，也可以直接const */
    timeRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timeRef.current);
          return 100;
        }
        return prev + increment;
      });
    }, update);

    /* 
       清理函數:
       1. 組件卸載、依賴項變化時，清除這個ref的定時器 
       2. 執行下一次進度條更新時，防止舊計時器繼續跑
    */
    return () => clearInterval(timeRef.current);
  }, [id]);

  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${progress}%` }} />
    </div>
  );
};
