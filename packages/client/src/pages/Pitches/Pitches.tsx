import { Typography } from "@material-ui/core";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
export default React.memo(Pitches);

function Pitches() {
  const pageMotion = useMemo(
    () => ({
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.25 } },
      exit: { opacity: 0, transition: { duration: 0.25 } },
    }),
    []
  );
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageMotion}
    >
      <Typography component="h1">this is pitches Page</Typography>
    </motion.div>
  );
}
