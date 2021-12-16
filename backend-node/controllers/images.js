const Image = require("../models/Image")

exports.getAll = async (req, res) => {
    
    try {

        const images = await Image.find({});
        res.send(images);

      } catch (error) {
        console.log("teretere")
        res.status(500).send({ get_error: 'Error while getting list of photos.' });

      }
    }