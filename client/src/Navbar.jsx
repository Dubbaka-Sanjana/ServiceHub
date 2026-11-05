import { NavLink, Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const name = localStorage.getItem('name');

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const cls = ({ isActive }) => (isActive ? 'active' : '');

  return (
    <nav className="navbar">
      <Link to="/" className="brand">🛠️ ServiceHub</Link>
      <div className="nav-links">
        <NavLink to="/" end className={cls}>Search</NavLink>
        {token && <NavLink to="/bookings" className={cls}>My Bookings</NavLink>}
        {role === 'provider' && <NavLink to="/add-service" className={cls}>Add Service</NavLink>}
      </div>
      <div className="nav-right">
        {token ? (
          <>
            <span className="user-pill">{name} · {role}</span>
            <button className="btn btn-outline btn-sm" onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="btn btn-sm">Login</Link>
        )}
      </div>
    </nav>
  );
}