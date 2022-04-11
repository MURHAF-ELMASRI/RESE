import * as yup from "yup";

const turkishPhoneRegExp =
  /(05)([0-9]{2})\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})/;
const signupValidation = yup.object({
  fullName: yup
    .string()
    .min(3, "You should enter name bigger than 3 character")
    .required(),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  password2: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password is required"),
  phone: yup
    .string()
    .matches(turkishPhoneRegExp, "Phone number is not valid")
    .required("phone is required  "),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

export default signupValidation;
