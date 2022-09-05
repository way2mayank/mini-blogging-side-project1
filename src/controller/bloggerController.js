const createBloggerModel = require("../Models/bloggerModel.js")
const createAuthorModel = require("../Models/authorModel.js")

const createBlog = async function(req,res){
    let data = req.body;
    let authorId = req.body.authorId
    let checkAuthorId = await createAuthorModel.findById(authorId)
    if(!authorId){
        res.status(401).send({status:false, msg:"please put authorId "})
    }	
    else if(!checkAuthorId){
        res.status(403).send({status:false, msg:"please enter a valid userId"})
    } else{
        let blogger = await createBloggerModel.create(data)
        res.status(200).send({status:true, msg:blogger})
    }
    res.status(500).send({status:false, msg:"server not found"})
}
// const getBlogs = async function(req,res){
//     let authorId = req.query.authorId
//     let category = req.query.category
//     let tag = req.query.tag
//     let subcategory = req.query.subcategory
    

// }
//     ### GET /blogs
// - Returns all blogs in the collection that aren't deleted and are published
// - Return the HTTP status 200 if any documents are found. The response structure should be like [this](#successful-response-structure) 
// - If no documents are found then return an HTTP status 404 with a response like [this](#error-response-structure) 
// - Filter blogs list by applying filters. Query param can have any combination of below filters.
//   By author Id
//   - By category
//   - List of blogs that have a specific tag
//   - List of blogs that have a specific subcategory
// example of a query url: blogs?filtername=filtervalue&f2=fv2

module.exports.createBlog=createBlog

