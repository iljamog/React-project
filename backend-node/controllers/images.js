const Image = require("../models/Image")
const Comment = require("../models/Comment")

exports.getAll = async (req, res) => {
    
    try {

        const images = await Image.find({});
        res.send(images);

      } catch (error) {
        console.log("Error while getting list of photos.")
        res.status(500).send({ get_error: 'Error while getting list of photos.' });

      }
    }

exports.deleteImage = async (req, res) => {
  const fileName = req.params.fileName;
  const filePath = "http://localhost:3001/uploads/" + fileName;

  try {
      const removeComments = await Comment.deleteMany({fileName: filePath})
      const removeImage = await Image.findOneAndDelete({fileName: fileName})
  } catch (error) {
      console.log("Some error")
      res.status(500).send({ get_error: 'Some error' });
  }
      
  
}