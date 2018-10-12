const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  // we have to validate only text because avatar and name will come from other collection
  data.text = !isEmpty(data.text) ? data.text : "";

  // post must be in-between length 20-280.
  if (!Validator.isLength(data.text, { min: 20, max: 280 })) {
    errors.text = "Post must be between length 20-280 characters.";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text-field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
