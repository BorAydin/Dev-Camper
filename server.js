const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files
const bootcamps = require('./routes/bootcamps');

const app = express();

// Body parser
app.use(express.json()); // Bunu yapmayınca crud istekleri vsc konsolunda undefined dönüyor. undefined'ın sebebi de request'in middleware(misal express) içermesi bunun olmaması için request.body'den middleware'ı ayırıp veriyi alıyor, parse ediyor.

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Sunucu ${process.env.NODE_ENV} ortamında ${PORT} portunda çalışıyor.`
      .yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Hata: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
