const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.school)) {
    errors.school = "Your details of school field is required";
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Your degree field is required";
  }

  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Your field-of-study field is required";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "Your  Start-Date field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
