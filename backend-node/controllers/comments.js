const Comment = require("../models/Comment")

exports.getAll = async (req, res) => {
    const fileName  = req.query.fileName
    try {
        const comments = await Comment.find({fileName: fileName});
        res.send(comments);
      } catch (error) {
        console.log("Error while getting comments.")
        res.status(500).send({ get_error: 'Error while getting comments.' });
      }
    }

    exports.addComment = async (req, res) => {
      const { firstName, lastName, comment, fileName } = req.body
      try {
          const newComment = new Comment({
            firstName,
            lastName,
            comment,
            fileName,
          })
        const savedComment = await newComment.save()
        if (!savedComment) throw Error("Error adding comment")
        
        res.status(200).json({ message: "Comment added" })
      } catch (e) {
        res.status(400).json({ error: e.message })
      }
    }

    