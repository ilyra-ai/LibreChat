require('dotenv').config();
const mongoose = require('mongoose');
const mysql = require('mysql2/promise');
const User = require('../api/models/User');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
  await connection.execute(
    'CREATE TABLE IF NOT EXISTS users (id VARCHAR(255) PRIMARY KEY, email VARCHAR(255), password VARCHAR(255))'
  );
  const users = await User.find().lean();
  const query =
    'INSERT INTO users (id, email, password) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE email=VALUES(email), password=VALUES(password)';
  for (const u of users) {
    await connection.execute(query, [u._id.toString(), u.email, u.password]);
  }
  await connection.end();
  await mongoose.disconnect();
}

run();
