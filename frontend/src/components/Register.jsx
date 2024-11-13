import { useState } from 'react';
import styles from '../styles/Register.module.css'

const Register = () => {
  const [username, setUsername] = useState('');
  const [pwHash, setPassword] = useState('');
  const [firstName, SetFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, pwHash, firstName, lastName, emailAddress }),
    });
    const result = await response.text();
    alert(result);
  };

  return (
    <div className={styles.login} id={styles.rcorners2}>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className={styles.imgcontainer}>
          <img 
            src="https://img.freepik.com/free-vector/men-chef-holding-plate-cartoon-food-restaurant-logo-hand-draw-vector-illustration_56104-2135.jpg"
            alt="Avatar"
            className={styles.avatar}
          />
        </div>
        <div className={styles.container}>
          <input
           className={styles.username}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className={styles.password}
            type="password"
            placeholder="Password"
            value={pwHash}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => SetFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
