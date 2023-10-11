import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup); // extend yup

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
  phoneNumber: yup.string().required(),
  bio: yup.string().min(150).required(),
});

export const fundWalletValidationSchema = yup.object({
  amount: yup.number().min(100).required(),
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
