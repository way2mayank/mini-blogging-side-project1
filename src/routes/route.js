const express = require('express');
const router = express.Router();
const authorController = require("../controller/authorController")
const bloggerController = require("../controller/bloggerController")

//create author api
router.post("/authors", authorController.createAuthor);
//create blog
router.post("/blogs", bloggerController.createBlog)
//get blogs///
router.get("/blogs", bloggerController.getBlogs)

router.put("/blogs/:blogId", bloggerController.updateBlog)

router.delete("/blogs/:blogId", bloggerController.deleteblog)

router.delete("/blogs", bloggerController.deletebyquery)


// router.get("/blogs/:blogId",bloggerController.deleteBlog)

module.exports = router;
