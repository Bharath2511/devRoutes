const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};
  //if its not empty then then let it be. If its empty then
  //it is an empty string//we are checking if its empty in isEmpty method
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to be between 2 an 40 characters";
  }
  if (validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }
  if (validator.isEmpty(data.status)) {
    errors.status = "Status field is required";
  }
  if (validator.isEmpty(data.skills)) {
    errors.skills = "skills field is required";
  }
  //we want to check url is not empty
  //becoz its gonna throw url error even if its empty
  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }

  //we are just returning the objects
  return {
    errors,
    //whether the data is valid or not
    //in isempty we want to check if errors are empty
    //gonna be valid if errors are empty
    isValid: isEmpty(errors)
  };
};
