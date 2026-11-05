
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './Navbar';
import Login from './Login';
import Search from './Search';
import ServiceDetails from './ServiceDetails';
import MyBookings from './MyBookings';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/service/:id" element={<ServiceDetails />} />
        <Route path="/bookings" element={<MyBookings />} />
      </Routes>
    </BrowserRouter>
  );
}
