import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import { Feature } from "../types/Features";

export default React.memo(PitchListItem);
interface Props {
  name: string;
  startDate: string;
  endDate: string;
  features?: Feature[];
}
function PitchListItem({ name, startDate, endDate, features }: Props) {
  const classes = useStyle();
  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <Typography className={classes.name}>{name}</Typography>
        <div className={classes.featureContainer}>
          {features?.map((feature) => (
            <div className={classes.feature}>
              <Typography>{feature}</Typography>
            </div>
          ))}
        </div>
      </div>
      <div className={classes.right}>
        <Typography>{startDate}</Typography>
        <Typography>{endDate}</Typography>
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
  feature: {
    padding: "4px 8px",
    background: theme.palette.background.default,
    borderRadius: 16,
  },
  name: {
    textAlign: "start",
  },
}));
