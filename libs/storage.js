const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'./storage/images')
    }})

    const upload =multer({storage})


module.exports = upload