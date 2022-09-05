const createAuthorModel = require("../Models/authorModel.js")

const createAuthor = async function(req,res){
    let data = req.body
    let savedData = await createAuthorModel.create(data)
    res.status(201).send({status:true, msg:savedData})
}

module.exports.createAuthor = createAuthor


// ### POST /blogs
// - Create a blog document from request body. Get authorId in request body only.
// - Make sure the authorId is a valid authorId by checking the author exist in the authors collection.
// - Return HTTP status 201 on a succesful blog creation. Also return the blog document. The response should be a JSON object like [this](#successful-response-structure) 
// - Create atleast 5 blogs for each author

// - Return HTTP status 400 for an invalid request with a response body like [this](#error-response-structure)
