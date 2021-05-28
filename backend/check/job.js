var Validator = require("validator");
var isEmpty = require("is-empty");
module.exports = function validateJobInput(data) {
let errors = {};
// Convert empty fields to an empty string so we can use validator functions
data.title = !isEmpty(data.title) ? data.title : "";
data.recname = !isEmpty(data.recname) ? data.recname : "";
data.recmail = !isEmpty(data.recmail) ? data.recmail : "";
data.num_app = !isEmpty(data.num_app) ? data.num_app : "";
data.position = !isEmpty(data.position) ? data.position : "";
data.jobtype = !isEmpty(data.jobtype) ? data.jobtype : "";
data.duration = !isEmpty(data.duration) ? data.duration : "";
data.salary = !isEmpty(data.salary) ? data.salary : "";
data.year = !isEmpty(data.year) ? data.year : "";
data.month = !isEmpty(data.month) ? data.month : "";
data.day = !isEmpty(data.day) ? data.day : "";
data.hour = !isEmpty(data.hour) ? data.hour : "";
data.minute = !isEmpty(data.minute) ? data.minute : "";

// title checks
if (Validator.isEmpty(data.title)) {
    errors.title = "title field is required";
}
// recname checks
if (Validator.isEmpty(data.recname)) {
    errors.recname = "recname field is required";
}
// recmail checks
if (Validator.isEmpty(data.recmail)) {
    errors.recmail = "recmail field is required";
}
// num_app checks
if (Validator.isEmpty(data.num_app)) {
    errors.num_app = "num_app field is required";
}
// position checks
if (Validator.isEmpty(data.position)) {
    errors.position = "position field is required";
}
// jobtype checks
if (Validator.isEmpty(data.jobtype)) {
    errors.jobtype = "jobtype field is required";
}
// duration checks
if (Validator.isEmpty(data.duration)) {
    errors.duration = "duration field is required";
}
else if (data.duration> 6){
    errors.duration = "duration should be less than 6";
}
// salary checks
if (Validator.isEmpty(data.salary)) {
    errors.salary = "salary field is required";
}
// year checks
if (Validator.isEmpty(data.time)) {
    errors.time = "time field is required";
}

return {
    errors,
    isValid: isEmpty(errors)
};
};