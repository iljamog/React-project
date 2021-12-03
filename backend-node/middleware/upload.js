// import multer, { diskStorage } from 'multer';

// // function makeid (length) {
// //   var result = ''
// //   var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
// //   var charactersLength = characters.length
// //   for (var i = 0; i < length; i++) {
// //     result += characters.charAt(Math.floor(Math.random() * charactersLength))
// //   }
// //   return result
// // }
// const storage = diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, '../uploads/')
//   },
//   filename: (req, file, cb) => {
//     const fileName = file.originalname.toLowerCase().split(' ').join('-')
//     cb(null, fileName)
//   }
// })
// const upload = multer({
//   storage: storage,
//   fileFilter: function (req, file, cb) {
//     var ext = path.extname(file.originalname);
//     if(ext !== '.png' && ext !== '.jpg'  && ext !== '.jpeg') {
//         cb(new Error('Wrong extension type'), false);
//     }
//     cb(null, true)
// }
// });

// export function send(req, res, next) {
//   return upload.single('file')(req, res, () => {
//     // Remember, the middleware will call it's next function
//     // so we can inject our controller manually as the next()
//     // INVALID FILE TYPE, message will return from fileFilter callback
//     if (err) {
//         return res.end(err.message);
//     }
//     // FILE NOT SELECTED
//     else if (!req.file) {
//         return res.end("File is required!");
//     }
//     // SUCCESS
//     else {
//         console.log("File uploaded successfully!");
//         console.log("File response", req.file);
//     }
//     next();
//   })
// }