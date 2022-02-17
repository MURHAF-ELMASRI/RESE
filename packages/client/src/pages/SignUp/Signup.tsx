import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import logo from "@rese/client/src/assets/logo.png";
import rectangle from "@rese/client/src/assets/rectangle.png";
import { useFormik } from "formik";
import React from "react";
export default React.memo(Signup);

function Signup() {
  const classes = useStyle();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {
      console.log("submit the values");
    },
  });

  return (
    <div className={classes.container}>
      <img src={logo} className={classes.logo} />
      <img src={rectangle} className={classes.leftRect} />
      <img src={rectangle} className={classes.rightRect} />
      <TextField title="Email" onChange={formik.handleChange} name="email" />
      <TextField title="Şifre" onChange={formik.handleChange} name="password" />
    </div>
  );
}

const useStyle = makeStyles((theme) => ({
  container: {
    width: "100%",
  },
  logo: {},
  leftRect: {},
  rightRect: {},
}));
