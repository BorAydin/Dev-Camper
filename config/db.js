const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  console.log(`MongoDB bağlandı : ${conn.connection.host} `);
};

module.exports = connectDB;
