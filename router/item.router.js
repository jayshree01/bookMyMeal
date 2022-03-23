const itemController = require('../controller/item.comtroller');
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
router.post("/add-item", upload.single("itemImageUrl"), itemController.addItem);
router.post("/update-item", upload.single("itemImageUrl"), itemController.updateItem);
router.get("/delete-item/:itemId", itemController.deleteItem);
router.get("/view-item", itemController.viewItem);
router.get("/item-by-id/:itemId", itemController.itemByid);


module.exports = router;