
import { useEffect, useState } from 'react';
import api from './api';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get('/bookings/mine');
        setBookings(response.data);
      } catch (err) {
        setError(err.response?.data?.msg || 'Unable to load bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <h3>Loading bookings...</h3>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h2>My Bookings</h2>

      {bookings.length === 0 ? (
        <p>You haven't booked any services yet.</p>
      ) : (
        <div className="service-grid">
          {bookings.map((booking) => (
            <div className="service-card" key={booking._id}>
              <h3>{booking.serviceId?.title || 'Service'}</h3>
              <p>Category: {booking.serviceId?.category || 'N/A'}</p>
              <p>Date: {booking.date}</p>
              <p>Time: {booking.slot}</p>
              <p>Address: {booking.address}</p>
              <p>Booking ID: {booking._id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
