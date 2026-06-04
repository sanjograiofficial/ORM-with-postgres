// this must validate that data must not be empty
let validateEmptyField = (fieldName, data) => {
  if (data == "") {
    return {
      error: `${fieldName} cannot be empty`,
    };
  }
  return null;
};

let validateAllFieldTypes = (fieldName, value) => {
  let errorMsg = null;
  if (fieldName == "email") {
    errorMsg = validateEmptyField(fieldName, value);
    if (errorMsg != null) return errorMsg;
    if (value.includes("@")) {
      errorMsg = `${fieldName} not valid`;
      return errorMsg;
    }
  } else if (fieldName == "name") {
    errorMsg = validateEmptyField(fieldName, value);
    if (errorMsg != null) return errorMsg;
    if (value.length < 3) {
      errorMsg = `${fieldName} must be at least 3 characters long`;
      return errorMsg;
    }
  }
};

export { validateAllFieldTypes };
