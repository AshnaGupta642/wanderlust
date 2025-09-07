const express =require("express");
const router= express.Router();
const wrapAsync=require("../utils/wrapAsync.js");

const listings=require("../routes/listing.js");

const Listing = require("../models/listing"); 
const {isLoggedIn, isOwner ,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({storage})



router.route("/")
.get((listingController.index))
.post(isLoggedIn,upload.single('listing[image]'),validateListing ,wrapAsync(listingController.createListing));

router.get("/category/:category",wrapAsync(async(req,res)=>{
    const { category } = req.params;
    const listings = await Listing.find({ category});
    res.render("listings/index",{allListings:listings,category});
}));

//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);


router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner ,upload.single('listing[image]'),validateListing ,wrapAsync(listingController.updateListing)) 
.delete(isLoggedIn, isOwner ,wrapAsync(listingController.destroyListing));


//edit route
router.get("/:id/edit",isLoggedIn,isOwner ,wrapAsync(listingController.renderEditForm));


module.exports=router;