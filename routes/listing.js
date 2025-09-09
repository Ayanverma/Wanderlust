const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const validateObjectId = require("../utils/validateObjectId");
const Listing = require("../Models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const { route } = require("./user.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });



router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

// New route
router.get("/new", isLoggedIn, listingController.renderNewForm);




router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    validateObjectId,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));


// Edit route
router.get(
  "/:id/edit",
  validateObjectId,
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);






module.exports = router;
