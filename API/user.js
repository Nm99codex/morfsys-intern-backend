// Library
import express from "express";
import bcrypt from "bcryptjs"

// Database Model
import { UserModel } from "../database/Users.js"

// Create a router
const Router = express.Router();

/**
 * Route        /:_id
 * Des          GET authorized user data
 * Params       none
 * Access       Public
 * Method       GET
 */
 Router.get("/:_id",async (req, res) => {
   try{
    const { _id } = req.params;
    console.log(_id)
    const getUser = await UserModel.findById(_id);
    console.log("User Details",getUser)

    if (!getUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user:  getUser });
   }
   catch(err){
     return res.status(500).json({
       message: err.message
     })
   }
  const {_id} = req.params;
  const getUser = await UserModel.findById(_id);
  console.log(getUser)
});


/**
 * Route        /update/:_id
 * Des          Update user data
 * Params       _id
 * Access       Public
 * Method       PUT
 */
Router.put("/update/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const userData = req.body;
    console.log("User data: ", userData)
    console.log("User id: ", typeof(userId))


    const updateUserData = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: userData,
      },
      {
        new: true,
      }
    );
    return res.json({ user: updateUserData });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route        /:userId
 * Des          Delete user data
 * Params       none
 * Access       Public
 * Method       DELETE
 */

Router.delete('/:userId', (req, res, next) => {
  UserModel.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      console.log(result);
      return res.status(200).json({
        message: "User Deleted"
      })
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        error: err
      })
    })
})

export default Router;
