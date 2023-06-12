const express = require('express');
const bcrypt = require('bcrypt');
const { UserModel } = require('../model/user.model');
require('dotenv').config()
const jwt = require('jsonwebtoken');
const { blackList } = require('../blackList');
const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
    const { email, pass, name, city, age, gender, is_married } = req.body;
    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            res.status(200).json({ msg: 'User already exist, please login' })
        }
        else {
            bcrypt.hash(pass, 5, async (err, hash) => {
                // Store hash in your password DB.
                if (err) {
                    res.status(200).json({ err: err.message })
                } else {
                    const user = new UserModel({ name, email, pass: hash, age, city, is_married });
                    user.save();
                    res.status(200).json({ msg: "New User Is Added " })
                }
            });
        }
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }


})
userRouter.post('/login', async (req, res) => {
    //logic
    const { pass, email } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        bcrypt.compare(pass, user.pass, async (err, result) => {
            const token = jwt.sign({ userID : user._id , user : user.name }, process.env.secrate);
            if (result) {
                res.status(200).json({ msg: "Login Successful!!", token: token });
            }
            else {
                res.status(200).json({ msg: "Wrong Crendintial" });
            }
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

userRouter.get('/logout', async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    try {
        blackList.push(token);
        res.status(200).json({ msg: "user has logedout" })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

module.exports = { userRouter };



/**
 * name ==> String
email ==> String
gender ==> String
password ==> String
age ==> Number
city ==> String
is_married ==> boolean
 */