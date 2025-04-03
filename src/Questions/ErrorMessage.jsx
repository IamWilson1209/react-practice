import React, { useState } from 'react';

const ErrorMessage = () => {
  const errMessage = 'Age need to be at least 18!';
  const [text, setText] = useState('');
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    try {
      setError(false);
      setText(e.target.value);
      if (e.target.value < 18) {
        setError(true);
      }
      if (!e.target.value) {
        setError(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Error Input</h2>
      <input type="text" value={text} onChange={(e) => handleInputChange(e)} />
      {error ? errMessage : null}
    </div>
  );
};

export default ErrorMessage;
