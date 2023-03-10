const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const bookController = require("../controllers/bookController");
const reviewController = require("../controllers/reviewController");
const { authentication, authorization, reviewAuth } = require("../middleware/middleware");



router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/books", authentication, bookController.createBook);
router.get("/books", authentication, bookController.getBooks);
router.get("/books/:bookId", authentication, bookController.getBooksByParams);
router.put("/books/:bookId", authentication, authorization, bookController.updateBooks);
router.delete("/books/:bookId", authentication, authorization, bookController.deleteBookPathParam);
router.post("/books/:bookId/review", reviewController.createReview);
router.put("/books/:bookId/review/:reviewId",reviewAuth, reviewController.updateReview);
router.delete("/books/:bookId/review/:reviewId", reviewAuth, reviewController.deleteReview);


router.all("/*", function (req, res) {
  return res
    .status(400)
    .send({ status: false, message: "invlalid http request" });
});

module.exports = router;
