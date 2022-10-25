import { Icon } from "@iconify/react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import type { SignupProps } from "@rese/client-server/api/signup";
import juniorScore from "@rese/client/src/assets/juniorSoccer.svg";
import logo from "@rese/client/src/assets/logo.png";
import rectangle from "@rese/client/src/assets/rectangle.png";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { signUp } from "../../api";
import getServerUrl from "../../api/getServerUrl";
import { setUser } from "../../state/User/UserSlice";
import { pageTransition } from "../../util/const";
import signupValidation from "./signupValidation";

export default React.memo(Signup);

function Signup() {
  const classes = useStyle();
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //TODO: add global loading

  const formik = useFormik<SignupProps>({
    initialValues: {
      fullName: "",
      password: "",
      password2: "",
      phone: 0,
      email: "",
      userType: "player",
    },
    validationSchema: signupValidation,
    onSubmit: async (values, formikHelper) => {
      console.log("submitting", values, getServerUrl());
      try {
        const result = await signUp(values).then((res) => {
          return res.data;
        });
        dispatch(setUser(result));
        navigate("/verify-user");
      } catch (err: any) {
        console.error(err);
        const errors = err?.response?.data as {
          param: keyof SignupProps;
          msg: string;
        }[];
        const errorObj: any = {};
        errors.forEach((x) => {
          errorObj[x.param] = x.msg;
        });
        formikHelper.setErrors(errorObj);
      }
    },
  });

  return (
    <motion.div className={classes.container} {...pageTransition}>
      <img src={rectangle} className={classes.leftRect} alt="square" />
      <img src={rectangle} className={classes.rightRect} alt="square" />

      <div className={classes.content}>
        <div className={classes.leftSection}>
          <img src={logo} className={classes.logo} alt="rese" />

          <div className={classes.inputContainer}>
            <TextField
              label="Full Name"
              onChange={formik.handleChange}
              name="fullName"
              className={classes.input}
              variant="outlined"
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />

            <TextField
              label="Email"
              onChange={formik.handleChange}
              name="email"
              className={classes.input}
              variant="outlined"
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              label="Password"
              onChange={formik.handleChange}
              name="password"
              className={classes.input}
              variant="outlined"
              type={showPass1 ? "text" : "password"}
              InputProps={{
                endAdornment: <EyeLogo onChange={setShowPass1} />,
              }}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <TextField
              label="Repeat password"
              onChange={formik.handleChange}
              name="password2"
              className={classes.input}
              variant="outlined"
              type={showPass2 ? "text" : "password"}
              InputProps={{
                endAdornment: <EyeLogo onChange={setShowPass2} />,
              }}
              error={
                formik.touched.password2 && Boolean(formik.errors.password2)
              }
              helperText={formik.touched.password2 && formik.errors.password2}
            />

            <TextField
              label="Cell phone"
              onChange={formik.handleChange}
              name="phone"
              className={classes.input}
              variant="outlined"
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />

            {/* <Select
              label="User Type"
              name="userType"
              data={[
                { title: "manger", value: "manger" },
                { title: "player", value: "player" },
              ]}
              value={formik.values.userType}
              onChange={formik.handleChange}
            /> */}
          </div>

          <Button
            className={classes.buttonGreen}
            color="primary"
            variant="contained"
            onClick={formik.submitForm}
          >
            Submit
          </Button>
        </div>
        <img
          src={juniorScore}
          decoding="async"
          className={classes.juniorScore}
          alt="background"
        />
      </div>
    </motion.div>
  );
}

function EyeLogo({ onChange }: { onChange: (state: boolean) => void }) {
  const [show, setShow] = useState(false);
  const handleClick = useCallback(() => {
    setShow(!show);
    onChange(!show);
  }, [show, setShow, onChange]);
  return (
    <IconButton onClick={handleClick}>
      {show ? <Icon icon="mdi:eye" /> : <Icon icon="mdi:eye-off" />}
    </IconButton>
  );
}

const useStyle = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: 0,
  },
  leftRect: {
    width: 200,
    position: "absolute",
    left: -120,
    top: 0,
  },
  rightRect: {
    width: 270,
    position: "absolute",
    right: -180,
    top: 300,
  },
  upLine: {
    width: "100%",
    height: 6,
    background: theme.palette.primary.main,
    zIndex: 10,
  },
  logo: {
    marginTop: 60,
    maxWidth: 112,
    marginBottom: 24,
    zIndex: 10,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 520,
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 16,
    },
  },
  input: {
    maxWidth: 290,
    marginBottom: 24,
    zIndex: 10,
  },
  buttonGreen: {
    justifyContent: "flex-start",
    width: 81,
    color: "#fff",
    height: 36,
  },
  juniorScore: {
    display: "none",
    maxWidth: 300,
    [theme.breakpoints.up("sm")]: {
      display: "inline-block",
    },
  },
  content: {
    display: "flex",
    gap: 24,
    width: "100%",
    justifyContent: "center",

    [theme.breakpoints.up("sm")]: {
      padding: "0 104px",
      justifyContent: "space-between",
    },
  },
  leftSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    [theme.breakpoints.up("md")]: {
      alignItems: "flex-start",
    },
  },
}));
