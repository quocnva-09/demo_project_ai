export type ValidationRule = "username" | "email" | "password" | "phone" | "identifier";

export const validationConfig = {
  username: {
    regex: /^(?=.*[a-zA-Z])[a-zA-Z0-9]{6,18}$/,
    message: "Username must be 6–18 characters and include both letters and numbers",
  },
  email: {
    regex: /^[A-Za-z0-9._-]{4,}@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    message: "Invalid email format",
  },
  password: {
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/,
    message: "Password must include uppercase, lowercase, number, and special character",
  },
  phone: {
    regex: /^\+?[0-9]{10}$/,
    message: "Invalid phone number (10-15 digits starting optionally with +)",
  },
  identifier: {
    regex: /^(?:[A-Za-z0-9._-]{4,}@[A-Za-z0-9.-]+\.[A-Za-z]{2,}|(?=.*[a-zA-Z])[a-zA-Z0-9]{6,18})$/,
    message: "Must be a valid username or email",
  },
};

export const validateField = (type: ValidationRule, value: string): string | null => {
  if (!value) {
    return "This field is required";
  }
  const config = validationConfig[type];
  if (!config.regex.test(value)) {
    return config.message;
  }
  return null;
};