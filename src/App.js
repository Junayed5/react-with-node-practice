import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUser] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/users')
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    console.log(user);

    fetch('http://localhost:4000/user', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(data => {
        const newUser = [...users,data];
        setUser(newUser)
      })
  }
  return (
    <div className='App'>
      <h1>My user :{users.length}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" id="name" /><br />
        <input type="email" name="email" id="email" /><br />
        <input type="submit" value="Add user" />
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}>{user.id}<b>name:</b>{user.name},<b>email:</b>{user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
