const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function seedUsers() {
  try {
    // Buat koneksi ke database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });

    console.log('Koneksi ke database berhasil!');

    // Data pengguna yang akan dimasukkan
    const users = [
      {
        username: 'admin',
        email: 'admin@pesonaciamis.com',
        password: 'admin123'
      },
      {
        username: 'user1',
        email: 'user1@pesonaciamis.com',
        password: 'user123'
      },
      {
        username: 'user2',
        email: 'user2@pesonaciamis.com',
        password: 'user456'
      }
    ];

    // Enkripsi password dan masukkan data ke database
    for (const user of users) {
      // Cek apakah username sudah ada
      const [existingUsers] = await connection.execute(
        'SELECT * FROM users WHERE username = ?',
        [user.username]
      );

      if (existingUsers.length > 0) {
        console.log(`User dengan username ${user.username} sudah ada, melewati...`);
        continue;
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);

      // Masukkan user ke database
      await connection.execute(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [user.username, user.email, hashedPassword]
      );

      console.log(`User ${user.username} berhasil ditambahkan!`);
    }

    console.log('Selesai mengisi data pengguna!');
    await connection.end();
  } catch (error) {
    console.error('Error saat mengisi data pengguna:', error);
  }
}

// Jalankan fungsi
seedUsers();