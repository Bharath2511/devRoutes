const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};
  //if its not empty then then let it be. If its empty then
  //it is an empty string
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "Job title field is required";
  }

  if (validator.isEmpty(data.company)) {
    errors.company = "company field is required";
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "from Date field is required";
  }

  //we are just returning the objects
  return {
    errors,
    //whether the data is valid or not
    //in isempty we want to check if errors are empty
    isValid: isEmpty(errors)
  };
};
