# 🛠️ ServiceHub – Local Service Booking Platform

## 📌 Project Description

ServiceHub is a full-stack web application that connects customers with local service providers. Users can search for services based on category and city, view service details, check availability, and book services online.

The platform provides separate roles for customers and service providers, making local service booking simple and convenient.

## ✨ Features

- **User Authentication:** Registration and login for customers and providers.
- **Service Search:** Search services by category and city.
- **Service Listings:** Browse available services with prices and locations.
- **Service Details:** View individual service information and availability.
- **Online Booking:** Select available dates and time slots to book services.
- **My Bookings:** View personal booking history.
- **Slot Management:** Prevent booking a time slot that is no longer available.
- **Database Integration:** Store users, services, and bookings in MongoDB Atlas.

## 💻 Technologies Used

| Component | Technology |
|---|---|
| Frontend | React.js, Vite |
| Styling | CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| ODM | Mongoose |
| Authentication | JWT |
| API Requests | Axios |

## 📂 Project Structure

```text
ServiceHub/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── Login.jsx
│   │   ├── Search.jsx
│   │   ├── Navbar.jsx
│   │   ├── ServiceDetails.jsx
│   │   ├── MyBookings.jsx
│   │   └── api.js
│   └── package.json
│
├── server/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed.js
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── package.json
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Dubbaka-Sanjana/ServiceHub.git
cd ServiceHub
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside the server folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the backend:

```bash
node server.js
```

### 3. Setup Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Open the local URL displayed by Vite in your browser.

## 🗄️ Database Collections

The application uses MongoDB Atlas with the following collections:

- **Users:** Stores customer and provider information.
- **Services:** Stores service listings, prices, locations, and availability.
- **Bookings:** Stores customer bookings and service details.

## 🚀 Future Enhancements

- Provider profile verification.
- Customer ratings and reviews.
- Booking status management.
- Online payment integration.
- Notifications for booking updates.

## 👩‍💻 Developed By

**Sanjana Dubbaka**

B.Tech – Computer Science and Engineering (AI & ML)

GitHub: [@Dubbaka-Sanjana](https://github.com/Dubbaka-Sanjana)

## 📜 License

This project is developed for academic purposes.
