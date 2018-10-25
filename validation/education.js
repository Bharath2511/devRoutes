const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};
  //if its not empty then then let it be. If its empty then
  //it is an empty string
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.school)) {
    errors.school = "School field is required";
  }

  if (validator.isEmpty(data.degree)) {
    errors.degree = "Degree field is required";
  }

  if (validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Field of study field is required";
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
