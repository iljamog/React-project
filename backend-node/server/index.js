const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require('../routes/auth');
const uploadRoutes = require('../routes/upload');

mongoose.connect(process.env.MDB_CONNECT,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("DB connected");
  }
);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
