import * as yup from "yup";

export const basicSchema = () => {
  return yup.object().shape({
    firstPhoneNumber: yup.string().min(8).required("Required"),
    secondPhoneNumber: yup.string().min(8).required("Required"),
    email: yup.string().email("Please enter valid email").required("Required"),
    windowType: yup.string().required("Required"),
    comment: yup.string().min(8).required("Required"),
    possibilityTime: yup.string().required("Required"),
  });
};
