const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};
  //if its not empty then then let it be. If its empty then
  //it is an empty string
  data.text = !isEmpty(data.text) ? data.text : "";

  if (!validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Post must be between 10and 300 characters";
  }

  if (validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  //we are just returning the objects
  return {
    errors,
    //whether the data is valid or not
    //in isempty we want to check if errors are empty
    isValid: isEmpty(errors)
  };
};
