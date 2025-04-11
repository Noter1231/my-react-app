import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginCredentials } from '../types';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Handle login
    navigate('/dashboard');
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={credentials.email}
          onChange={(e) => setCredentials({...credentials, email: e.target.value})}
        />
        <input
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;