const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const app = express();
const dotenv = require("dotenv");
const authRoutes = require('../routes/auth');

dotenv.config();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

mongoose.connect(process.env.MDB_CONNECT,
{
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