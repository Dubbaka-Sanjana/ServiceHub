import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from './api';

export default function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');
  const [address, setAddress] = useState('');
  const [msg, setMsg] = useState('');

  const role = localStorage.getItem('role');

  const load = async () => {
    const res = await api.get(`/services/${id}`);
    setService(res.data);
  };

  useEffect(() => { load(); }, [id]);

  const book = async () => {
    setMsg('');
    if (!localStorage.getItem('token')) return navigate('/login');
    if (!date || !slot || !address) return setMsg('Choose a date, a slot, and enter your address.');
    try {
      await api.post('/bookings', { serviceId: id, date, slot, address });
      navigate('/bookings');
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Booking failed');
      setSlot('');
      load();
    }
  };

  if (!service) return <div className="container">Loading...</div>;

  const day = service.availability.find(a => a.date === date);
  const availableDays = service.availability.filter(a => a.slots.length > 0);

  return (
    <div className="container">
      <div className="details">
        <div className="card">
          <span className="tag">{service.category}</span>
          <h2>{service.title}</h2>
          <p className="meta">📍 {service.city}</p>
          <p className="price" style={{ fontSize: 28 }}>₹{service.price}</p>
          <div className="provider" style={{ marginTop: 16 }}>
            <span className="avatar">{service.providerId?.name?.[0]?.toUpperCase() || '?'}</span>
            <div>
              <div style={{ color: 'var(--text)', fontWeight: 600 }}>{service.providerId?.name}</div>
              <div>{service.providerId?.phone || 'No phone listed'}</div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Book this service</h3>

          <p className="section-title">1. Pick a date</p>
          <div className="chip-row">
            {availableDays.map(a => (
              <button key={a.date} className={`chip ${date === a.date ? 'active' : ''}`}
                onClick={() => { setDate(a.date); setSlot(''); }}>
                {a.date}
              </button>
            ))}
            {availableDays.length === 0 && <p className="meta">No slots available.</p>}
          </div>

          {day && (
            <>
              <p className="section-title">2. Pick a time slot</p>
              <div className="chip-row">
                {day.slots.map(s => (
                  <button key={s} className={`chip ${slot === s ? 'active' : ''}`} onClick={() => setSlot(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </>
          )}

          <p className="section-title">3. Your address</p>
          <input placeholder="House no, street, area" value={address} onChange={e => setAddress(e.target.value)} />

          <div style={{ marginTop: 20 }}>
            {role === 'provider' ? (
              <p className="notice">Providers can't book. Log in as a customer.</p>
            ) : (
              <button className="btn btn-block" onClick={book}>Confirm booking</button>
            )}
          </div>
          {msg && <p className="error" style={{ marginTop: 12 }}>{msg}</p>}
        </div>
      </div>
    </div>
  );
}