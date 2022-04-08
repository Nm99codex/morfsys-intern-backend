import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true
    },
    passWord: { type: String, required: true }

  },
  {
    timestamps: true,
  });

  UserSchema.methods.generateJwtToken = function () {
    return jwt.sign({ user: this._id.toString() }, "Morfsys");
  };


UserSchema.statics.findByEmailAndUserName = async ({ email, UserName }) => {
  // check whether email, UserName exists in out database or not
  const checkUserByEmail = await UserModel.findOne( email );
  console.log(checkUserByEmail)
  const checkUserByUserName = await UserModel.findOne({ UserName });
  console.log(checkUserByUserName)


  if (checkUserByEmail || checkUserByUserName) {
    throw new Error("User already exists!");
  }

  return false;
};


UserSchema.statics.findByEmailAndPassword = async ({ email, password }) => {
  //check wether email exists
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("User does nor exist!!!");

  // compare password
  const doesPasswordMatch = await bcrypt.compare(password, user.password);

  if (!doesPasswordMatch) throw new Error("invalid password!!!");

  return user;
};

export const UserModel = mongoose.model("Users", UserSchema);