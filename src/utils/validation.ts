import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup); // extend yup

// used throughout the file
const amountWithCurrencySchema = yup.object({
  currency: yup.string().required("Please select a currency"),
  value: yup
    .number()
    .when("currency", { is: "NGN", then: (schema) => schema.min(1000).required() })
    .when("currency", { is: "USD", then: (schema) => schema.min(10).required() })
    .when("currency", { is: "EUR", then: (schema) => schema.min(10).required() }),
});

const MediaValidationSchema = yup.object().shape({});

export const signUpValidationSchema = yup.object({
  userName: yup
    .string()
    .min(6, "userName must contain 6 or more letters")
    .matches(/^[a-zA-Z0-9@]+$/, "This field cannot contain white space and special character")
    .required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .password()
    .min(8, "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special")
    .minLowercase(1, "password must contain at least 1 lower case letter")
    .minUppercase(1, "password must contain at least 1 upper case letter")
    .minNumbers(1, "password must contain at least 1 number")
    .minSymbols(1, "password must contain at least 1 special character")
    .required("field is mandatory"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password.")
    .oneOf([yup.ref("password")], "Your passwords do not match."),
});

export const loginValidationSchema = yup.object({
  emailOrUsername: yup.string().required(),
  password: yup
    .string()
    .password()
    .min(8, "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special")
    .minLowercase(1, "password must contain at least 1 lower case letter")
    .minUppercase(1, "password must contain at least 1 upper case letter")
    .minNumbers(1, "password must contain at least 1 number")
    .minSymbols(1, "password must contain at least 1 special character")
    .required("field is mandatory"),
});

export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .password()
    .min(8, "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special")
    .minLowercase(1, "password must contain at least 1 lower case letter")
    .minUppercase(1, "password must contain at least 1 upper case letter")
    .minNumbers(1, "password must contain at least 1 number")
    .minSymbols(1, "password must contain at least 1 special character")
    .required("field is mandatory"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password.")
    .oneOf([yup.ref("password")], "Your passwords do not match."),
});

export const forgotPasswordSchema = yup.object({
  email: yup.string().email().required(),
});

export const updateProfileSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phoneNumber: yup
    .string()
    .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, "Must be a valid phone number")
    .required(),
  bio: yup.string().min(150).required(),
});

export const fundWalletValidationSchema = yup.object({
  amount: amountWithCurrencySchema,
  password: yup
    .string()
    .password()
    .min(8, "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special")
    .minLowercase(1, "password must contain at least 1 lower case letter")
    .minUppercase(1, "password must contain at least 1 upper case letter")
    .minNumbers(1, "password must contain at least 1 number")
    .minSymbols(1, "password must contain at least 1 special character")
    .required("field is mandatory"),
});

export const createIdeaSimpleValidationSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().min(150).required(),
  category: yup.array().of(yup.string()),
  collaborators: yup.array().of(yup.string()),
});
