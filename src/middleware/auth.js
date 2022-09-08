const jwt = require("jsonwebtoken")
const bloggerModel = require("../model/blogModel");

const authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if(!token) return res.status(403).send({status:false, msg:"required token"})
        jwt.verify(token, "mini-project", function (error, decoded) {
            if (error) {
                return res.status(401).send({ msg: error.message })
            }
            req.token = decoded
            next()
        })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const authorization = async function (req, res, next) {
    try {

        let blogId = req.params.blogId
        let blogg = await bloggerModel.findById(blogId)
        if (!blogg) {
            return res.status(404).send({ status: false, msg: "No blog found by this blogId" })
        }
        let author_Id = blogg.authorId.toString()
        let userToken = req.token.aurhorId
        if(author_Id !== userToken) {
            return res.status(403).send({ status: false, msg: "you are not authorised" })
        }
        next()
    } catch (error) {
        return res.status(500).send(error.message)

    }
}
const auth2 = async function(req,res,next){
    try {
        let token = req.headers["x-api-key"]
let decodedToken  = jwt.verify(token, "mini-project")
let getData = req.query;
let check = await bloggerModel.find(getData)
if(decodedToken.authorId!=check.authorId ){
    return res.send("you are not auth")
} else{
    next()
}
    } catch (error) {
        return res.status(500).send({status:false, msg:error.message})
    }
}

module.exports = { authentication, authorization, auth2}






