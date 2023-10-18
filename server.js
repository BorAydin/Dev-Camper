const express = require('express');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

app.get('/api/v1/bootcamps', (req, res) => {
  res.status(200).json({ succces: true, msg: 'Tüm eğitimleri göster' });
});

app.get('/api/v1/bootcamps/:id', (req, res) => {
  res
    .status(200)
    .json({ succces: true, msg: `${req.params.id} idli eğitimi getir.` });
});

app.post('/api/v1/bootcamps', (req, res) => {
  res.status(200).json({ succces: true, msg: 'Yeni eğitim oluştur' });
});

app.put('/api/v1/bootcamps/:id', (req, res) => {
  res
    .status(200)
    .json({ succces: true, msg: `${req.params.id} idli eğitimi güncelle.` });
});

app.delete('/api/v1/bootcamps/:id', (req, res) => {
  res
    .status(200)
    .json({ succces: true, msg: `${req.params.id} idli eğitimi sil.` });
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Sunucu ${process.env.NODE_ENV} ortamında ${PORT} portunda çalışıyor.`
  )
);
