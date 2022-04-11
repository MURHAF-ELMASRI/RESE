import Dialog from "@material-ui/core/Dialog";
import makeStyle from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import { PitchType } from "@rese/client-server/model/Pitch";
import React, { memo, useCallback, useState } from "react";
import Button from "./Button";
import GoogleMap from "./maps/GoogleMap";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (x: Pick<PitchType, "location">) => void;
}

function LocationDialog(props: Props) {
  const { open, onClose, onSubmit } = props;
  const [point, setPoint] = useState<Pick<PitchType, "location">>();
  const classes = useStyle();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleSubmit = useCallback(() => {
    if (point) {
      onSubmit(point);
    }
    handleClose();
  }, [onSubmit, handleClose, point]);

  const handleMapClick = useCallback(
    (coord) => {
      const { lat, lng } = coord;
      console.log(lat, lng);
      setPoint({ location: { lat, lng } });
    },
    [setPoint]
  );
  console.log(point);
  return (
    <Dialog open={open ?? true} onClose={onClose} fullScreen={fullScreen}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Typography component={"h5"} className={classes.title}>
            Select Pitch Location
          </Typography>
        </div>
        <div className={classes.body}>
          <GoogleMap pitches={point ? [point] : []} onClick={handleMapClick} />
        </div>
        <div className={classes.actions}>
          <Button label="Close" color="default" onClick={handleClose} />
          <Button label="Select" onClick={handleSubmit} />
        </div>
      </div>
    </Dialog>
  );
}

export default memo(LocationDialog);

const useStyle = makeStyle((theme) => ({
  container: {
    width: 520,
    height: 520,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    padding: 24,
    borderBottom: `1px solid ${theme.palette.divider}`,
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  title: {
    fontWeight: 500,
  },
  body: {
    padding: 16,
    flex: 1,
    width: "100%",
  },
  actions: {
    padding: 16,
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    gap: 8,
    borderTop: `1px solid ${theme.palette.divider}`,
  },
}));
