import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import logo from "@rese/client/src/assets/logo.png";
import rectangle from "@rese/client/src/assets/rectangle.png";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";

export default React.memo(VerifyUser);

function VerifyUser() {
  const classes = useStyle();

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit: (values) => {
      
    },
  });

  return (
    <div className={classes.container}>
      <img src={rectangle} className={classes.leftRect} decoding="async" />
      <img src={rectangle} className={classes.rightRect} decoding="async" />
      <div className={classes.body}>
        <img src={logo} className={classes.logo} decoding="async" />
        <Typography className={classes.text} color="primary">
          Enter verification code sent to your email
        </Typography>
        <TextField
          name={"code"}
          onChange={formik.handleChange}
          className={classes.input}
          label="code"
          variant="outlined"
        />
        <Button
          onClick={formik.submitForm}
          variant="contained"
          className={classes.buttonGreen}
          color="primary"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

const useStyle = makeStyles((theme) => ({
  container: {
    padding: 24,
    display: "flex",
    justifyContent: "center",
  },
  body: {
    display: "flex",

    flexDirection: "column",
    alignItems: "center",
    gap: 32,
    maxWidth: 400,
  },
  leftRect: {
    width: 200,
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: -1,
  },
  rightRect: {
    width: 270,
    position: "absolute",
    right: 0,
    top: 380,
    zIndex: -1,
  },
  logo: {
    maxWidth: 200,
  },
  input: {
    width: "100%",
  },
  buttonGreen: {
    color: "#fff",
    alignSelf: "flex-start",
  },
  text: {
    fontWeight: 600,
  },
}));
