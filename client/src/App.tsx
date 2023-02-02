import { useEffect, useState } from 'react';

import './App.css';

const findUser = async () => {
  return new Promise<string>((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API_PROD_URL}/find`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':
          process.env.REACT_APP_API_PROD_URL || 'http://localhost:5000'
      },
      credentials: 'include'
    })
      .then((data) => data.json())
      .then((data) => resolve(data))
      .catch((e) => reject({ status: e.status, statusCode: e.statusCode }));
  });
};

const App = () => {
  const [user, setUser] = useState('Pesho');
  console.log(process.env.REACT_APP_API_PROD_URL);
  useEffect(() => {
    const getUser = async () => {
      const data = await findUser();
      console.log(data);
      setUser(data);
    };
    getUser();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <p>{user}</p>
      </header>
    </div>
  );
};

export default App;
