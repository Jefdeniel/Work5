import { useState, useEffect } from 'react';
import axios from 'axios';

function Test() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/get_calendars/')
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Frontend line</h1>
      <p>backend line: {message}</p>
    </div>
  );
}

export default Test;
