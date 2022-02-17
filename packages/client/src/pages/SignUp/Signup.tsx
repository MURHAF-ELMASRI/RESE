import makeStyles from "@material-ui/core/styles/makeStyles";
import logo from "@rese/client/src/assets/logo.png";
import rectangle from "@rese/client/src/assets/rectangle.png";
import React from "react";
export default React.memo(Signup);

function Signup() {
  const classes = useStyle();
  return (
    <div className={classes.container}>
      <img src={logo} className={classes.logo} />
      <img src={rectangle} className={classes.leftRect} />
      <img src={rectangle} className={classes.rightRect} />
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
