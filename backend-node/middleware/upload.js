const multer = require('multer');

const DIR = './uploads/'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR)
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-')
    cb(null, fileName)
  }
})
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('Only .png, .jpg, .mp4 and .jpeg format allowed!'))
    }
  }
})

module.exports.send = (req, res, next) => {
  return upload.single('file')(req, res, () => {
    // Remember, the middleware will call it's next function
    // so we can inject our controller manually as the next()

    if (!req.file) return res.json({ error: " Something went wrong when uploading " })
    next()
  })
}