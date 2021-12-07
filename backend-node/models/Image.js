const { Schema, model } = require('mongoose')

const imageSchema = new Schema({
  fileName: { type: String, required: true },
  albumName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Image = model("Image", imageSchema)

module.exports = Image