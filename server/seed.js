
require('dotenv').config();

const mongoose = require('mongoose');
const Service = require('./models/Service');

async function seedServices() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected!');

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);

    const formatDate = (date) => date.toISOString().split('T')[0];

    const availability = [
      {
        date: formatDate(tomorrow),
        slots: ['10:00', '12:00', '16:00']
      },
      {
        date: formatDate(dayAfter),
        slots: ['09:00', '13:00', '17:00']
      }
    ];

    const services = [
      {
        category: 'Plumber',
        title: 'Home Plumbing Repair',
        price: 500,
        city: 'Hyderabad'
      },
      {
        category: 'Electrician',
        title: 'Electrical Repairs',
        price: 400,
        city: 'Hyderabad'
      },
      {
        category: 'Tutor',
        title: 'Mathematics Home Tutor',
        price: 600,
        city: 'Hyderabad'
      },
      {
        category: 'Cleaner',
        title: 'Home Deep Cleaning',
        price: 800,
        city: 'Hyderabad'
      },
      {
        category: 'Carpenter',
        title: 'Furniture Repair',
        price: 450,
        city: 'Hyderabad'
      }
    ];

    for (const service of services) {
      await Service.findOneAndUpdate(
        { title: service.title, city: service.city },
        { ...service, availability },
        { upsert: true, new: true }
      );
    }

    console.log('5 sample services added successfully!');

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

seedServices();
