const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

mongoose.connect("mongodb+srv://root:root@big-burps-pennywhistle.pknyp.mongodb.net/users?retryWrites=true&w=majority",
{
  useNewUrlParser: true,
}
);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});