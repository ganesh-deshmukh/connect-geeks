const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 4, max: 30 })) {
    errors.name = "Name must be between min-4 and max-30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is Compulsory";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is Compulsory";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is Compulsory";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is Compulsory";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  // if (!Validator.isAlphanumeric(data.password, "en-US")) {
  //   console.log("password is not alhanumeric " + data.password);
  //   errors.password = " Not an alphanumeric";
  // }

  return {
    // send this to calling functions
    errors,
    isValid: isEmpty(errors)
  };
};
