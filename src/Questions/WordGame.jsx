import React, { useEffect, useState } from 'react';
import './WordGame.css'; // 導入 CSS

const WordGame = () => {
  const [counter, setCounter] = useState(0);
  const [user, setUser] = useState('');
  const [userJSON, setUserJSON] = useState('');
  const [userImageUrl, setUserImageUrl] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        /* 回傳 */
        const response = await fetch('https://randomuser.me/api');

        /* 轉JSON */
        const jsonData = await response.json();
        setUserJSON(jsonData);
        console.log(jsonData.results[0].picture.thumbnail);
        const imageUrl = jsonData.results[0].picture.thumbnail;
        setUserImageUrl(imageUrl);

        /* 轉string */
        const data = JSON.stringify(jsonData, null, 2);
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInfo();
  }, []);

  const fetchUserByPage = async () => {
    const response = await fetch(
      `https://randomuser.me/api?page=${pageNumber}`
    );
    const data = await response.json();
    return data;
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    setCounter(counter + 1);
  };

  const handleGetMoreUser = async (e) => {
    e.preventDefault();
    setPageNumber(pageNumber + 1);
    const data = await fetchUserByPage();
    setUserList([...userList, data]);
    console.log(userList);
  };

  return (
    <div>
      <h1>Hello Code</h1>
      <h2>Counter: {counter}</h2>
      <button onClick={handleOnClick}>click</button>
      <button onClick={handleGetMoreUser}>click</button>

      <h2>User: </h2>
      <img src={userImageUrl} alt="no result" />
      <div className="image-display">
        {/* JSON */}
        {userList.map((newUser, index) => {
          console.log('newUser: ', newUser);
          console.log('newUser type: ', typeof newUser.results[0].gender);
          return (
            <>
              <span>{newUser.results[0].gender}</span>
              <img
                className="image-size"
                key={index}
                src={newUser.results[0].picture.thumbnail}
                alt={'no'}
              />
            </>
          );
        })}
        {/* stringity */}
        <pre>{user}</pre>
      </div>
    </div>
  );
};

export default WordGame;
