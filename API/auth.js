// Library
import express from "express";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Database Model
import { UserModel } from "../database/Users.js"
import { ValidateSignup, ValidateSignin } from '../validation/validationAuth.js'

// Create a router
const Router = express.Router();

/**
 * Router       /signup
 * Des          Register new user
 * Params       none
 * Access       Public
 * Method       POST
 */

Router.post("/signup", async (req, res) => {
  try {
    const { email, passWord, firstName,lastName, userName } = req.body;
    const checkUserByEmail = await UserModel.findOne({ email });
    console.log(checkUserByEmail)
    const checkUserName = await UserModel.findOne({ userName });
    console.log(checkUserName)


    if (checkUserByEmail || checkUserName) {
      return res.json({ user: "User already exists!" });
    }

    // hash password
    const bcryptSalt = await bcrypt.genSalt(8);
    const hashedpassWord = await bcrypt.hash(passWord, bcryptSalt);

    // save data to database
    await UserModel.create({
      ...req.body,
      passWord: hashedpassWord,
    });

    //generate JWT auth token (package name is jsonwebtoken)
    const token = jwt.sign({ user: { userName, email, passWord } }, "Morfsys");

    return res.status(200).json({ token, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});



/**
 * Router       /signin
 * Des          Sign-in with email and password
 * Params       none
 * Access       Public
 * Method       POST
 */
Router.post("/signin", async (req, res) => {
  try {
    console.log(req.body)
    await ValidateSignin(req.body);
    const user = await UserModel.findByEmailAndPassword(req.body);
    const token = (user).generateJwtToken();
    return res.status(200).json(
      {
        token,
        status: "Sign in successfully"
      }
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


export default Router;
