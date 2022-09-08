const express = require('express');
const router = express.Router();
const authorController = require("../controller/authorController")
const bloggerController = require("../controller/bloggerController")
const auth = require("../middleware/auth.js")

//create author api
router.post("/authors", authorController.createAuthor);
//create blog
router.post("/blogs",auth.authentication, bloggerController.createBlog);

router.post("/loginAuthor",authorController.loginAuthor);
//get blogs///
router.get("/blogs",auth.authentication, bloggerController.getBlogs);

router.put("/blogs/:blogId", auth.authentication,auth.authorization, bloggerController.updateBlog);

router.delete("/blogs/:blogId", auth.authentication, auth.authorization, bloggerController.deleteblog);

router.delete("/blogs", auth.authentication, auth.auth2, bloggerController.deletebyquery);


// router.get("/blogs/:blogId",bloggerController.deleteBlog)

module.exports = router;
