import { Typography } from "@material-ui/core";
import { motion } from "framer-motion";
import React from "react";
export default React.memo(Pitches);

function Pitches() {

  return (
    <motion.div
      {...pageTransition  }
    >
      <Typography component="h1">this is pitches Page</Typography>
    </motion.div>
  );
}
