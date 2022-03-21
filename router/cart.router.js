const cartController=require('../controller/cart.controller');
const router=require('express').Router();

router.get("/add-item/:itemId",cartController.addItemInCart);
router.get("/add-package/:packageId",cartController.addPackageInCart);
router.get("/remove-item/:itemId",cartController.removeItemFromCart);
router.get("/remove-package/:packageId",cartController.removePackageFromCart);


module.exports=router;