const router = express.router();
const authorController = require("../controller/authorController")

//create author api
router.post("/authors" , authorController.createAuthor);
//create blog
router.post("/blog",bloggerController.createBlog)
//get blogs 
router.get("/authors",bloggerController.getBlogs)

module.exports = router;
