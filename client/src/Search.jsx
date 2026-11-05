import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from './api';

const CATEGORIES = ['Plumber', 'Electrician', 'Tutor', 'Cleaner', 'Carpenter'];

export default function Search() {
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async (cat = category, c = city) => {
    setLoading(true);
    try {
      const res = await api.get('/services', { params: { category: cat, city: c } });
      setServices(res.data);
    } catch {
      setServices([]);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const pick = cat => { setCategory(cat); load(cat, city); };

  return (
    <>
      <div className="hero">
        <h1>Find trusted local services</h1>
        <p>Plumbers, electricians, tutors and more, booked in a few clicks.</p>
        <div className="search-bar">
          <input placeholder="What do you need? (e.g. Plumber)" value={category}
            onChange={e => setCategory(e.target.value)} />
          <input placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
          <button className="btn" onClick={() => load()}>Search</button>
        </div>
        <div className="chips">
          {CATEGORIES.map(c => (
            <button key={c} className="chip" onClick={() => pick(c)}>{c}</button>
          ))}
          <button className="chip" onClick={() => pick('')}>All</button>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 0 }}>
        <div className="grid">
          {loading && <p className="empty">Loading...</p>}
          {!loading && services.length === 0 && <p className="empty">No services found. Try another search.</p>}

          {!loading && services.map(s => (
            <div key={s._id} className="service-card">
              <span className="tag">{s.category}</span>
              <h3>{s.title}</h3>
              <div className="meta">📍 {s.city}</div>
              <div className="provider">
                <span className="avatar">{s.providerId?.name?.[0]?.toUpperCase() || '?'}</span>
                {s.providerId?.name}
              </div>
              <div className="card-footer">
                <span className="price">₹{s.price}</span>
                <Link to={`/service/${s._id}`} className="btn btn-sm">View & Book</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}