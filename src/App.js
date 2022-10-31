import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [users, setUsers] = useState([])

  useEffect(() =>{
    fetch('http://localhost:5000/users')
    .then(Response => Response.json())
    .then(data => setUsers(data))
  }, [])
  const handleAddUser = event =>{
    event.preventDefault()
    const name = event.target.name.value
    const email = event.target.email.value
    const user = {name, email}
    console.log(user)
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(Response => Response.json())
    .then(data => {
      console.log(data)
      const newUsers = [...users, data]
      setUsers(newUsers)
    })
    .catch(error => {
      console.error(error)
    })
    event.target.reset('')
  }
  return (
    <div className="App">

      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" placeholder='name' required />
        <br />
        <input type="email" name="email" id="" placeholder='email' required />
        <br />
        <button type="submit">Add User</button>

      </form>
     <h2>Users: {users.length} </h2>
     {
       users.map(user => <p
       key={user.id}
       user={user}
       >{user.name} {user.email}</p> )
     }
    </div>
  );
}

export default App;
