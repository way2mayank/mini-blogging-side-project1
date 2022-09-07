const bloggerModel = require("../model/blogModel.js")
const authorModel = require("../model/authorModel.js");

const createBlog = async function (req, res) {
    let data = req.body;
    let authorId = req.body.authorId
    let checkAuthorId = await authorModel.findById(authorId);
    if (!authorId) {
        return res.status(401).send({ status: false, msg: "please put authorId" })
    }
    else if (!checkAuthorId) {
        return res.status(403).send({ status: false, msg: "please enter a valid userId" })
    }
    let blogger = await bloggerModel.create(data)
    return res.status(200).send({ status: true, msg: blogger })
}

const getBlogs = async function (req, res) {
    let getQuery = req.query
    let data = await bloggerModel.find({ $and: [getQuery, { isDeleted: false }, { isPublished: true }] }).populate("authorId")
    if (!data) return res.status(404).send({ status: false, msg: "please use query" })
    return res.status(200).send(data)
}


const updateBlog = async function (req, res) {
    try {
        let getId = req.params.blogId
        let data = req.body
        let updateId = await bloggerModel.findOne({ _id: getId })
        if (updateId) {
            if (updateId.isDeleted === false) {
                let update = await bloggerModel.findByIdAndUpdate(getId, { $push: { tags: data.tags, subcategory: data.subcategory }, title: data.title, body: data.body, category: data.category, isPublished: true, publishedAt: Date.now() }, { new: true })
                return res.status(200).send({ status: true, msg: update })
            }
            else {
                return res.send("CAN'T UPDATE , IT IS DELETED")
            }
        }
        else {
            return res.status(401).send({ status: false, msg: "Please enter valid Blog id" })
        }
    } catch (error) {
        console.log(error.message)
        return res.status(500).send(error.message)
    }
}


const deleteblog = async function (req, res) {
    try {
        let id = req.params.blogId
        if (!id) {
            return res.status(404).send({ status: false, msg: "id not found" })
        }
        let blogid = await bloggerModel.findById(id)
        if (!blogid) {
            return res.status(403).send("NOT A VALID BLOG ID")
        }
        if (blogid.isDeleted == false) {
            let deletes = await bloggerModel.findOneAndUpdate({ _id: id }, { $set: { isDeleted: true },
                 detetedAt: Date.now() }, { new: true })
            return res.status(200).send({ msg: "user deleted successfully", data: deletes })
        }
        else {
            res.status(404).send({ status: false, msg: 'blog already deleted' })
        }
    }
    catch (err) {
        res.status(500).send({ msg: err.message })
    }
}


const deletebyquery = async function (req, res) {
    let data = req.query
    let find = await bloggerModel.findOne(data)
    if (!find) { return res.status(404).send({ status: false, msg: "BlogId is not valid" }) }
    if (find.isDeleted == true) { return res.status(400).send({ status: false, msg: "THIS DOCUMENT Is deleted" }) }
    let saved = await bloggerModel.findOneAndUpdate(data, { $set: { isDeleted: true } }, { new: true })
    return res.status(200).send({ status: true, msg: saved })

}

module.exports = { createBlog, getBlogs, updateBlog, deleteblog, deletebyquery }