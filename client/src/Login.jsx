import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', password: '', role: 'customer', city: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setError('');
    try {
      if (isRegister) {
        await api.post('/auth/register', form);
      }
      const res = await api.post('/auth/login', {
        email: form.email,
        password: form.password
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      localStorage.setItem('name', res.data.user.name);
      navigate('/');
      window.location.reload(); // refresh navbar
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong');
    }
  };

  return (
    <div className="auth-wrap">
      <div className="card auth-card">
        <h2>{isRegister ? 'Create account' : 'Welcome back'}</h2>
        <p className="subtitle">
          {isRegister ? 'Join to book or offer local services' : 'Login to continue'}
        </p>
        <form onSubmit={submit} className="form-grid">
          {isRegister && (
            <>
              <div><label>Name</label>
                <input name="name" placeholder="Your name" value={form.name} onChange={change} required /></div>
              <div><label>City</label>
                <input name="city" placeholder="e.g. Hyderabad" value={form.city} onChange={change} required /></div>
              <div><label>I am a</label>
                <select name="role" value={form.role} onChange={change}>
                  <option value="customer">Customer</option>
                  <option value="provider">Service Provider</option>
                </select></div>
            </>
          )}
          <div><label>Email</label>
            <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={change} required /></div>
          <div><label>Password</label>
            <input name="password" type="password" placeholder="••••••••" value={form.password} onChange={change} required /></div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn btn-block">{isRegister ? 'Register' : 'Login'}</button>
        </form>
        <p className="link" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Already have an account? Login' : 'New here? Register'}
        </p>
      </div>
    </div>
  );
}