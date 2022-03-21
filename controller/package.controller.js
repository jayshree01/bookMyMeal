const { request, response } = require('express');
const Package = require('../model/package.model');

exports.savePackage = (request, response, next) => {
    console.log(request.file)

    const package = new Package();
    package.packageName = request.body.packageName;
    package.packageUses = request.body.packageUses;
    package.packageDescription = request.body.packageDescription;
    package.categoryId = request.body.categoryId;
    package.packageImageUrl = "http://localhost:3000/images/"+ request.file.filename;
    package.items.push(request.body.item1);
    package.items.push(request.body.item2);
    package.save()
        .then(result => {
            return response.status(201).json(result);
        })
        .catch(err => {
            return response.status(500).json({ message: "OOps!Something Went Wrong" })
        })


};

exports.viewPackage = (request, response, next) => {
    Package.find().populate({
            path: 'items',
            populate: {
                path: 'categoryId'
            }
        }).populate('categoryId')
        .then(
            result => {
                return response.status(200).json(result);
            }
        )
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "Oops!Sonething Went Wrong" })
        })
};
exports.deletePackage = (request, response, next) => {
    Package.deleteOne({ _id: request.params.packageId })
        .then(result => {
            if (result.deletedCount)
                return response.status(202).json({ message: "success" });
            else
                return response.status(204).json({ message: "Item Not found" });

        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "Oops!Something Went Wrong" });
        });
};
exports.addItemInPackage = async(request, response, next) => {
    const packageId = request.params.packageId;
    const item = request.params.itemId;
    let package = await Package.findOne({ _id: packageId });
    package.items.push(item);
    package.save()
        .then(result => {
            return response.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "Oops!Something Went Wrong" });
        })


};
exports.removeItemFromPackage = (request, response, next) => {
    Package.findOneAndUpdate({ _id: request.params.packageId }, {
            $pullAll: {
                items: [
                    { _id: request.params.itemId }
                ]
            }

        })
        .then(result => {
            return response.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "Oops!Something Went Wrong" });
        });

};
exports.updatePackage = (request, response, next) => {
    console.log(request.body)
    let imageUrl = request.body.oldImageUrl;
    if (request.file)
        imageUrl = "http://localhost:3000/images/" + request.file.filename;
    Package.findByIdAndUpdate({ _id: request.body.packageId }, {
            $set: {
                packageName: request.body.packageName,
                packageUses: request.body.packageUses,
                packageDescription: request.body.packageDescription,
                categoryId: request.body.categoryId,
                packageImageUrl: imageUrl

            }
        })
        .then(result => {
            return response.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "Oops!Something is Wrong" })
        })

};
exports.packageByid = (request, response, next) => {
    Package.findOne({ _id: request.params.packageId })
        .then(result => {
            return response.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "OOps!Something Went Wrong" });
        });
};