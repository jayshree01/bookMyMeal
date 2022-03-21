const Item = require('../model/item.model');
const { validationResult } = require('express-validator');

exports.addItem = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.array() });
    const item = new Item();
    item.itemName = request.body.itemName;
    item.itemPrice = request.body.itemPrice;
    item.categoryId = request.body.categoryId;
    item.itemImageUrl = "http://localhost:3000/images/" + request.file.filename;
    item.save()
        .then(result => {
            return response.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "OOps!Something Went Wrong" });
        });

};
exports.deleteItem = (request, response, next) => {
    Item.deleteOne({ _id: request.params.itemId })
        .then(result => {
            if (result.deletedCount)
                return response.status(201).json({ message: "success" });
            else
                return response.status(204).json({ message: "item is not find" });
        })
        .catch(err => {
            console.log(err)
            return response.status(500).json({ message: "OOps!Something Went Wrong" });
        });
};
exports.updateItem = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.array() });
    let imageUrl = request.body.oldImageUrl;
    if (request.file)
        imageUrl = "http://localhost:3000/images/" + request.file.filename;
    const itemName = request.body.itemName;
    const itemPrice = request.body.itemPrice;
    const itemDiscount = request.body.itemDiscount;
    const categoryId = request.body.categoryId;
    Item.updateOne({ _id: request.body.itemId }, {
            $set: {
                itemName: itemName,
                itemPrice: itemPrice,
                itemImageUrl: imageUrl,
              
         
                categoryId: categoryId,


            }
        })
        .then(result => {
            if (result.modifiedCount)
                return response.status(205).json({ message: "success" });
            else
                return response.status(204).json({ message: "Item not Found" });
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "Oops!Something Went Wrong" })
        })

};
exports.viewItem = (request, response, next) => {
    Item.find().populate('categoryId')
        .then(result => {
            return response.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "Oops!Something Went Wrong" });
        })

};
exports.itemByid = (request, response, next) => {
    Item.findOne({ _id: request.params.itemId })
        .then(result => {
            return response.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "OOps!Something Went Wrong" });
        });
};