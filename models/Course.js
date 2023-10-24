const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Lütfen kurs başlığını ekleyin.'],
  },
  description: {
    type: String,
    required: [true, 'Lütfen tanımlama ekleyin.'],
  },
  weeks: {
    type: String,
    required: [true, 'Lütfen hafta sayısını ekleyin.'],
  },
  tuition: {
    type: String,
    required: [true, 'Lütfen öğretim ücretini ekleyin.'],
  },
  minimumSkill: {
    type: String,
    required: [true, 'Lütfen seviyeyi ekleyin.'],
    enum: ['beginner', 'intermediate', 'advanced'],
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false,
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
});

module.exports = mongoose.model('Course', CourseSchema);
