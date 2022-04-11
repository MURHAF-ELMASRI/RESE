import makeStyle from "@material-ui/core/styles/makeStyles";
import classNames from "classnames";
import React, { memo } from "react";

interface Props {
  src: string;
  className?: string;
  onClick?: () => void;
}

function Avatar(props: Props) {
  const { src, className, onClick } = props;
  const classes = useStyle();
  return (
    <div
      className={classNames(className, classes.avatarContainer)}
      onClick={onClick}
    >
      <img className={classes.avatar} src={src} />
    </div>
  );
}

export default memo(Avatar);

const useStyle = makeStyle((theme) => ({
  avatar: {
    width: "100%",
  },
  avatarContainer: {
    width: 32,
    height: 32,
    display: "flex",
    overflow: "hidden",
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 500000,
  },
}));
