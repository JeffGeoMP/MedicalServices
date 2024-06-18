import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'database-1.cj6aoa0gc6zd.us-east-1.rds.amazonaws.com', 
  user: 'admin',
  password: 'admin12345', 
  database: 'MedicalEvent' 
});

export const getConnection = async () => {
  return await pool.getConnection();
};
