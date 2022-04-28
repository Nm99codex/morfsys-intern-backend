import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
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


UserSchema.statics.findByEmailAndUserName = async ({ email, userName }) => {
  console.log(email, userName)
  // check whether email, userName exists in out database or not
  const checkUserByEmail = await UserModel.findOne(email);
  console.log(checkUserByEmail.length)
  const checkUserByuserName = await UserModel.findOne( userName );
  console.log(checkUserByuserName.length)

  if (checkUserByEmail || checkUserByuserName) {
    throw new Error("User already exists!");
  }

  return false;
};


UserSchema.statics.findByEmailAndPassword = async ({ email, passWord }) => {
  //check wether email exists
  console.log(email,passWord)
  const user = await UserModel.findOne({email});
  console.log("User: ",user)
  if (!user) throw new Error("User does nor exist!!!");

  // compare passWord
  const doesPassWordMatch = await bcrypt.compare(passWord, user.passWord);

  if (!doesPassWordMatch) throw new Error("invalid passWord!!!");

  return user;
};

export const UserModel = mongoose.model("Users", UserSchema);