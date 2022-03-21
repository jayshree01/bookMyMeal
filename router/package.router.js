const packageController = require('../controller/package.controller.js');
const { body } = require('express-validator');
const express = require('express');
const router = express.Router();
const multer = require('multer');
var storage = multer.diskStorage({
    destination: 'public/images',
    filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
var upload = multer({ storage: storage });
router.post("/add-package", upload.single('packageImageUrl'), packageController.savePackage);
router.get("/view-package", packageController.viewPackage);
router.get("/delete-package/:packageId", packageController.deletePackage);
router.get("/add-item-package/:packageId/:itemId", packageController.addItemInPackage);
router.get("/remove-item-package/:packageId/:itemId", packageController.removeItemFromPackage);
router.post("/update-package", upload.single('packageImageUrl'), packageController.updatePackage);
router.get("/package-by-id/:packageId", packageController.packageByid);


module.exports = router;