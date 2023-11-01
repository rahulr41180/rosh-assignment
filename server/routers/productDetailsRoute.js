
const express = require("express");

const router = express.Router();
const multer = require("multer");
const path = require("path");
const { productDetailsUpload, getProductFiles } = require("../controllers/productDetailsController.js");


// Uploading File Into Local Folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        // Set the destination folder for file uploads
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        // console.log('file:', file)
        // Set the filename for uploaded files
        cb(null, file.originalname);
    },
});

const upload = multer({ storage : storage });

// Getting Data Length || METHOD : GET
router.get("/get-all-product", getProductFiles);

// Storing Data || METHOD : POST
router.post("/file-upload", upload.single("file"), productDetailsUpload);

module.exports =  router;