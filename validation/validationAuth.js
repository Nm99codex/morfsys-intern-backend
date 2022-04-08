import joi from "joi";

export const ValidateSignup = (userData) => {
  const Schema = joi.object({
    firstName: joi.string().required().min(2),
    email: joi.string().email().required(),
    passWord: joi.string().required(),
    lastName: joi.string().required().min(2),
    userName: joi.string(),
  });

  return Schema.validateAsync(userData);
};

export const ValidateSignin = (userData) => {
  const Schema = joi.object({
    email: joi.string().email().required(),
    passWord: joi.string().required(),
  });

  return Schema.validateAsync(userData);
};