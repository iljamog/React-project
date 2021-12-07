const Image = require("../models/Image")

exports.uploadFiles = async (req, res) => {
    const { albumName } = req.body
    //const { fileNames } = req.files
    let fileArray = []  
     
  
    try {

      req.files.forEach((file)=> {
        fileArray.push({
          fileName: file.filename,
          albumName: albumName
        })
      })

      Image.insertMany(fileArray).then((param) => {
        console.log("files added to db")
        res.status(200).json({ message: "Tervitus" })
      });
      
      
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  }