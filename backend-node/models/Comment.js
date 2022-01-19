const { Schema, model } = require('mongoose')

const commentSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    comment: { type: String, required: true },
    fileName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Comment = model("Comment", commentSchema)

module.exports = Comment