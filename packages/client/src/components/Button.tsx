import MatButton from "@material-ui/core/Button";
import makeStyle from "@material-ui/core/styles/makeStyles";
import classNames from "classnames";
import React, { memo } from "react";

interface Props {
  className?: string;
  color?: "primary" | "default";
  label: string;
  onClick: () => void;
}

function Button(props: Props) {
  const { className, color = "primary", onClick, label } = props;
  const classes = useStyle();
  return (
    <MatButton
      onClick={onClick}
      variant="contained"
      color={color}
      className={classNames(className, {
        [classes.buttonGray]: color === "default",
        [classes.buttonGreen]: color === "primary",
      })}
    >
      {label}
    </MatButton>
  );
}

export default memo(Button);

const useStyle = makeStyle((theme) => ({
  buttonGray: {
    color: theme.palette.primary.main,
  },
  buttonGreen: {
    color: "#fff",
  },
}));
