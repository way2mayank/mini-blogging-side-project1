const authorModel = require("../model/authorModel.js")
const validator = require("validator")
const jwt = require("jsonwebtoken")

const createAuthor = async function (req, res) {
    try {
        let data = req.body;
    let email = data.email;
    if(!data){
        return res.status(404).send({status:false, msg:"please enter required data"})
    }
    if(!data.fname) return res.status(404).send({status:false, msg:"please use fname"})
    if(!data.lname) return res.status(404).send({status:false, msg:"please use lname"})
    if(!data.title) return res.status(404).send({status:false, msg:"please use title"})
    if(!data.email) return res.status(404).send({status:false, msg:"please use eamilId"})
    if(!data.password) return res.status(404).send({status:false, msg:"please use password"})
    if(data.password.length<=6) return res.status(404).send({status:false, msg:"please use more than six characters"})
    if (!validator.isEmail(email)) return res.status(400).send({ status: false, msg: "invalid email Id" })
    
    let validEmail = await authorModel.findOne({ email: email })
    if (validEmail) {
        return res.send("This email Id is already registered")
    }
    let savedData = await authorModel.create(data)
    res.send({ msg: savedData })
    } catch (error) {
        return res.status(500).send({status:false, msg:error.message})
    }
    
}

const loginAuthor = async function(req, res){
    try{
    let data = req.body
    let author  = await authorModel.findOne({email:data.email},{password:data.password})
    if (!author){
        return res.status(404).send({status:false, msg:"author not found"})
    }
    let token = jwt.sign(
        {
            aurhorId: author._id.toString(),
            batch: "plutonium",
            organisation: "FunctionUp",
        },
        "mini-project"
    ); 
    res.setHeader("x-api-key", token);
    return res.status(200).send({status:true, msg: "token generated successfully"})
} 
catch(error){
    return res.status(500).send(error.message)
}
}

module.exports = {createAuthor,loginAuthor}



// ### POST /blogs
// - Create a blog document from request body. Get authorId in request body only.
// - Make sure the authorId is a valid authorId by checking the author exist in the authors collection.
// - Return HTTP status 201 on a succesful blog creation. Also return the blog document. The response should be a JSON object like [this](#successful-response-structure)
// - Create atleast 5 blogs for each author
// - Return HTTP status 400 for an invalid request with a response body like [this](#error-response-structure)
