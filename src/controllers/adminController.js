const { pool } = require('../config/db');

// Get dashboard data
exports.getDashboard = async (req, res) => {
  try {
    // Ambil jumlah destinasi
    const [destinasiCount] = await pool.execute('SELECT COUNT(*) as count FROM destinasi_wisata');
    
    // Ambil jumlah kritik & saran
    const [kritikSaranCount] = await pool.execute('SELECT COUNT(*) as count FROM kritik_saran');
    
    // Ambil jumlah user
    const [userCount] = await pool.execute('SELECT COUNT(*) as count FROM users');
    
    // Ambil destinasi terbaru
    const [latestDestinasi] = await pool.execute(
      'SELECT * FROM destinasi_wisata ORDER BY created_at DESC LIMIT 5'
    );
    
    // Ambil kritik & saran terbaru
    const [latestKritikSaran] = await pool.execute(
      'SELECT * FROM kritik_saran ORDER BY created_at DESC LIMIT 5'
    );

    res.status(200).json({
      status: 'success',
      data: {
        counts: {
          destinasi: destinasiCount[0].count,
          kritikSaran: kritikSaranCount[0].count,
          users: userCount[0].count
        },
        latestDestinasi,
        latestKritikSaran
      }
    });
  } catch (error) {
    console.error('Error mendapatkan data dashboard:', error);
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server'
    });
  }
};