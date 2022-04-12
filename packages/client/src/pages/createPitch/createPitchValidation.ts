import * as yup from "yup";

const turkishPhoneRegExp =
  /(05)([0-9]{2})\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})/;

const createPitchValidation = yup.object({
  pitchName: yup
    .string()
    .min(3, "You should enter name bigger than 3 character")
    .required(),
  location: yup
    .object()
    .shape({
      lat: yup.number(),
      lng: yup.number(),
    })
    .required("location is required"),
  phone: yup
    .string()
    .matches(turkishPhoneRegExp, "Phone number is not valid")
    .required("phone is required  "),
  numberOfSubPitches: yup
    .number()
    .moreThan(0, "You can have 1 sub-pitch or more")
    .required("this field is required"),
  openAt: yup.number().moreThan(0).required("open hour is required"),
  closeAt: yup.number().required("close hour is required"),
});

export default createPitchValidation;
