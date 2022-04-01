import { Icon } from "@iconify/react";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import logo from "@rese/client/src/assets/logo.png";
import rectangle from "@rese/client/src/assets/rectangle.png";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { pageTransition } from "../../util/const";

export default React.memo(Login);

function Login() {
  const navigate=useNavigate()
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

    const navigateToSignup = useCallback(() => {
        console.log("singup")
        navigate("/signup")
     },[])
    
  return (
      <motion.div className={classes.container}
      {...pageTransition}
      >
          <div className={classes.upLine}/>
      <img src={logo} className={classes.logo} />
      <img src={rectangle} className={classes.leftRect} />
      <img src={rectangle} className={classes.rightRect} />
          <TextField label="Email" onChange={formik.handleChange} name="email" className={classes.input} variant="outlined"/>
      <TextField label="Password" onChange={formik.handleChange} name="password" className={classes.input} variant="outlined"/>
          <div className={classes.buttonContainer}>


          <Button color="primary"
              variant="contained"
              className={classes.buttonGreen}
            >Login</Button>
          
          <Button color="default" variant="contained" className={classes.buttonGray}
              startIcon={<Icon
                  className={classes.iconGreen}
                  icon="mdi:google"
                  width={24}
              />}
          
          >Login with google</Button>
      <Button color="primary" variant="contained" className={classes.buttonGreen}                    onClick={navigateToSignup}
 startIcon={<Icon
                    className={classes.icon}
                    icon="mdi:plus"
                  width={24}
                  
              />}>Sign Up</Button>
          </div>
         
    </motion.div>
  );
}   

const useStyle = makeStyles((theme) => ({
    container: {
        display: "flex",
        height:"100%",
        alignItems:"center",
        flexDirection:"column",
        width: "100%",
        position: "relative",
        overflow: 'hidden',
    //   gap:16,
    },
    upLine: {
        width: "100%",
        height: 6,
        background:theme.palette.primary.main,
        zIndex:10,
    },
    logo: {
        marginTop:60,
        maxWidth: 112,
        marginBottom: 24
        ,
        zIndex: 10,
  },
    leftRect: {
        width:200,
        position: "absolute",
        left: -120,
        top:0,
  },
    rightRect: {
        width:270,
        position:"absolute",
        right: -180,
        top:300,
    },
    input: {
        maxWidth: 600,
        minWidth:290,
        marginBottom: 24,
        zIndex: 10,
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "column",
        gap:16
    },

    buttonGreen: {
        justifyContent:'flex-start',
        width:"100%",
        color:"#fff"
    },
    buttonGray: {
        justifyContent:'flex-start',
        width:"100%",
        color:theme.palette.primary.main,

    },
    icon: {
        color:"#fff"
    },
    iconGreen: {
        color:theme.palette.primary.main,
    }

}));
