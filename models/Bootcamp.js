const mongoose = require('mongoose');
const slugify = require('slugify');

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Lütfen isim giriniz.'],
    unique: true,
    trim: true,
    maxlength: [50, 'İsim 50 karakteri geçemez.'],
  },
  slug: String, // Devcentral Bootcamp ismini path'e şöyle geçiriyor. devcentral-bootcamp Özeti: URL friendly version of name for Frontend Dev.
  description: {
    type: String,
    required: [true, 'Lütfen isim giriniz.'],
    maxlength: [500, 'Açıklama 500 karakteri geçemez.'],
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'HTTP ya da HTTPS içeren geçerli bir bağlantı giriniz.',
    ],
  },
  phone: {
    type: String,
    maxlength: [20, 'Telefon numarası 20 karakteri geçemez.'],
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Lütfen geçerli bir e-posta adresi giriniz.',
    ],
  },
  address: {
    type: String,
    required: [true, 'Lütfen bir adres giriniz.'],
  },
  location: {
    // GeoJSON Point
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      index: '2dsphere',
    },
    formattedAdress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  careers: {
    // Array of strings
    type: [String],
    required: true,
    enum: [
      'Web Development',
      'Mobile Development',
      'UI/UX',
      'Data Science',
      'Business',
      'Other',
    ],
  },
  averageRating: {
    type: Number,
    min: [1, 'Puan en az 1 olabilir.'],
    max: [10, 'Puan en fazla 10 olabilir.'],
  },
  avarageCost: Number,
  photo: {
    type: String,
    default: 'no-photo.jpg',
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create bootcamp slug from the name
BootcampSchema.pre('save', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
  }); /* this ile schemadaki fieldlara(alanlara) erişiyoruz. lower küçük yazdıracak, hyphens ya da underscore özelliklleri de var slugify'ın) */
  next();
}); /* mongoose pre midleware'ı bizim yapacağımız operasyonlardan,işlemlerden, isteklerden önce çalışcak. Biz burayı
istediğimiz şekilde kodlayıp düzenleyebiliyoruz. next() ile de diğer middleware ile çağrı yapar. */

module.exports = mongoose.model('Bootcamp', BootcampSchema);
