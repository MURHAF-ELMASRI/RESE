import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import type { PitchType } from "@rese/client-server/model/Pitch";
import React from "react";

export default React.memo(PitchListItem);
type Props = {
  data: PitchType;
};
function PitchListItem({ data }: Props) {
  const { name, openAt, closeAt, freeServices } = data;
  console.log(name, openAt, closeAt);

  const classes = useStyle();
  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <Typography className={classes.name}>{name}</Typography>
        <div className={classes.featureContainer}>
          {freeServices?.map((service, idx) => (
            <div key={idx} className={classes.service}>
              <Typography>{service}</Typography>
            </div>
          ))}
        </div>
      </div>
      <div className={classes.right}>
        <Typography>{openAt}</Typography>
        <Typography>{closeAt}</Typography>
      </div>
    </div>
  );
}

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    width: "100%",
    padding: "8px 16px",
    borderBottom: `solid 1px ${theme.palette.divider}`,
  },
  left: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  right: {
    maxWidth: 48,
  },
  featureContainer: {
    display: "flex",
    gap: 8,
  },
  service: {
    padding: "4px 8px",
    background: theme.palette.background.default,
    borderRadius: 16,
  },
  name: {
    textAlign: "start",
  },
}));
