const validateUserName = (username) => {
  username = username.trim();
  let error = "";

  if (username.length < 8) {
    error = "Username must cantain at least 8 characters.";
  }
  return error;
};

const validateName = (name) => {
  name = name.trim();
  let error = "";

  if (name.length === 0) {
    return "A required field";
  } else if (/[0-9]/.test(name)) {
    return "Cannot contain numbers";
  } else if (/[!@#$%^&*]/.test(name)) {
    return "Cannot contain symbols";
  }
  return error;
};

const validatePassword = (password, password2 = null) => {
  password = password.trim();
  let error = "";

  if (!/[a-z]/.test(password)) {
    return "Should include minimum 01 lowercase";
  } else if (!/[A-Z]/.test(password)) {
    return "Should include minimum 01 uppercase";
  } else if (!/[0-9]/.test(password)) {
    return "Should include minimum 01 number";
  } else if (!/[!@#$%^&*]/.test(password)) {
    return "Should include minimum 01 symbol";
  } else if (password.length < 8) {
    return "Password must cantain at least 8 characters.";
  }
  if (password2 != null && password !== password2) {
    return "Password didn't match.";
  }
  return error;
};

const validateEmail = (email) => {
  email = email.trim();
  let pattern = /.*@.*\..*/;

  if (email.length === 0) {
    return "A required field";
  } else if (!pattern.test(email)) {
    return "Not a valid email type";
  }
  return "";
};

const requiredField = (field) => {
  field = `${field}`.trim();

  if (field.length === 0) {
    return "A required field.";
  }
  return "";
};

const ratingFieldRequired = (value) => {
  if (0 < value && value <= 5) {
    return "";
  } else {
    return "Select a rating.";
  }
};

export {
  validateUserName,
  validatePassword,
  validateEmail,
  validateName,
  requiredField,
  ratingFieldRequired,
};
