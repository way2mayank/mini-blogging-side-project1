const authorModel = require("../model/authorModel.js")
const jwt = require("jsonwebtoken")
const matchPass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const checkName = /^[A-Z]{1}[a-z]+$/
const emailMatch = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/


const createAuthor = async function (req, res) {
    try {
        let data = req.body;
        let { fname, lname, title, email, password } = data

        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, msg: "please use data to create author" })

        if (!fname || fname == "") return res.status(400).send({ status: false, msg: "please enter fname"})
        if (!checkName.test(fname)) return res.status(404).send({ status: false, msg: "please use first letter of fname in uppercase"})

        
        if (!lname || lname=="") return res.status(404).send({ status: false, msg: "please use lname" })
        if (!checkName.test(lname)) return res.status(404).send({ status: false, msg: "please use first letter of lname in uppercase" })

        if (!title || title == "") return res.status(404).send({ status: false, msg: "please use title" })

        if (!email) return res.status(404).send({ status: false, msg: "please use eamilId" })
        let validEmail = await authorModel.findOne({ email: email })
        if (validEmail) return res.status(400).send("This email Id is already registered")
        if (!emailMatch.test(email)) return res.status(400).send({ status: false, msg: "please use valid emailId" })

        if (!password) return res.status(404).send({ status: false, msg: "please use password" })
        if (password.length <= 6) return res.status(404).send({ status: false, msg: "please use more than six characters" })
        if (!matchPass.test(password)) return res.status(404).send({ status: false, msg: "please use special character to create author" })

        let savedData = await authorModel.create(data)
        res.send({ msg: savedData })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }

}
const loginAuthor = async function (req, res) {
    try {
        let data = req.body
        let author = await authorModel.findOne({ email: data.email }, { password: data.password })
        if (!author) return res.status(404).send({ status: false, msg: "author not found" })
        let token = jwt.sign(
            {
                aurhorId: author._id.toString(),
                batch: "plutonium",
                organisation: "FunctionUp",
            },
            "mini-project"
        );
        res.setHeader("x-api-key", token);
        return res.status(200).send({ status: true, msg: "token generated successfully" })
    }
    catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = { createAuthor, loginAuthor }

//includes
