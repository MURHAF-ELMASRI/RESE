import Typography from "@material-ui/core/Typography";
import { motion } from "framer-motion";
import React from "react";
import { pageTransition } from "../../util/const";
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
