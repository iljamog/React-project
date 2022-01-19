const { Schema, model } = require('mongoose')

const commentSchema = new Schema({
    user: { type: String, required: true },
    comment: { type: String, required: true },
    fileName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Image = model("Image", imageSchema)

module.exports = Image