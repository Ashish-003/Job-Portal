var Validator = require("validator");
var isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.contact = !isEmpty(data.contact) ? data.contact : "";
  data.bio = !isEmpty(data.bio) ? data.bio : "";
  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  //contact
  if (Validator.isEmpty(data.contact)) {
    errors.contact = "Contact field is required";
  }
  else if (!Validator.isLength(data.contact, { min: 10, max: 10 })) {
    errors.contact = "Contact must be at 10 characters";
  }
  //bio
  if (Validator.isEmpty(data.bio)) {
    errors.bio = "bio field is required";
  }
  else if (data.bio.split(" ").length>250) {
    errors.bio = "bio can  be atmost 250 characters";
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};