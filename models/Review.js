const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Lütfen yorum için başlık giriniz.'],
    maxlength: 100,
  },
  text: {
    type: String,
    required: [true, 'Lütfen yorum giriniz.'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, 'Lütfen 1 ile 10 arasında puan giriniz.'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Review', ReviewSchema);
