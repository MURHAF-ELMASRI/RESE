import { Icon } from "@iconify/react";
import makeStyle from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";
import Tooltip from "@material-ui/core/Tooltip";
import React, { memo } from "react";

interface Props {
  onClick?: () => void;
  text?: string;
  lat: number;
  lng: number;
}

function Marker(props: Props) {
  const { onClick, text } = props;
  const color = useTheme().palette.error.main;
  const classes = useStyle();
  return (
    <div onClick={onClick} className={classes.container}>
      {text ? (
        <Tooltip title={text}>
          <Icon
            className={classes.icon}
            icon={"mdi:map-marker"}
            color={color}
            width={24}
          />
        </Tooltip>
      ) : (
        <Icon
          className={classes.icon}
          icon={"mdi:map-marker"}
          color={color}
          width={24}
        />
      )}
    </div>
  );
}

export default memo(Marker);

const useStyle = makeStyle((theme) => ({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    userSelect: "none",
    cursor: "pointer",
    "&:hover": {
      zIndex: 1,
    },
  },
  icon: {},
}));
