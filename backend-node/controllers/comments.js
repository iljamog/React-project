const Comment = require("../models/Comment")

exports.getAll = async (req, res) => {
    const { id } = req.body
    
    try {

        const comments = await Comment.find({ id: id});
        res.send(comments);

      } catch (error) {
        console.log("Error while getting comments.")
        res.status(500).send({ get_error: 'Error while getting comments.' });

      }
    }