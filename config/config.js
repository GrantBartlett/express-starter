require('dotenv').load();

module.exports = {
  db: process.env.MONGO_URL || 'mongodb://localhost/monthly-reports',
  title: process.env.title || 'Monthly Reports'
};