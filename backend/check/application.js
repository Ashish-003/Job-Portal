var Validator = require("validator");
var isEmpty = require("is-empty");
module.exports = function validateAppInput(data) {
    let errors = {};
    data.sop = !isEmpty(data.sop) ? data.sop : "";
    if (Validator.isEmpty(data.sop)) {
        errors.sop = "Statement of  purpose is required";
    }
    else if(data.sop.split(" ").length > 250) {
        errors.sop = "sop can  be atmost 250 characters";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};