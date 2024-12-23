import mysql from 'mysql2/promise';

export const mysqlconn = await mysql.createConnection({ 
    host: import.meta.env.VITE_DB_HOST,
    user: import.meta.env.VITE_DB_USER,
    password: import.meta.env.VITE_DB_PASSWORD,
    database: import.meta.env.VITE_DB_NAME
});