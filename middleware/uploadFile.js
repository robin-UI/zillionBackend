const multer = require("multer");
const path = require("path");

const multiStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/images"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() + 1e9);
        // cb(null, file.originalname + "-" + uniqueSuffix + ".jpeg")
        console.log(file.originalname);
        cb(null, file.originalname)
    },
    
}) 

const multerFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true)
    } else {
        cb ({ message: "Unsupported file format" }, false)
    }
}

const uploadPhoto = multer({
    storage: multiStorage,
    fileFilter: multerFilter,
    limits: { fieldSize: 2000000}
})

module.exports = { uploadPhoto }