// validation is for checking user has entered write values
// we have validation for register, login and now profile also.
// check info in profile section is write or not according to need

const Validator = require("validator");
const isEmpty = require("./is-empty");

// validate handle,status, skills
module.exports = function validateLoginInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle must between length 2 and 4 characters";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is compulsory";
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = "Status field is compulsory";
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skills field is compulsory";
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Invalid URL, please paste exact url of your profile";
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Invalid URL, please paste exact url of your profile";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Invalid URL, please paste exact url of your profile";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Invalid URL, please paste exact url of your profile";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Invalid URL, please paste exact url of your profile";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Invalid URL, please paste exact url of your profile";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

// it will be valid if there are no errors. i.e. only if errors object is empty
