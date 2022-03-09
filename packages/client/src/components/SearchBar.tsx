import { Icon } from "@iconify/react";
import InputBase from "@material-ui/core/InputBase";
import makeStyles from "@material-ui/core/styles/makeStyles";
import classnames from "classnames";
import React from "react";
export default React.memo(SearchBar);

interface Props {
  inputText?: string;
  className?: string;
}

function SearchBar({ inputText, className }: Props) {
  const classes = useStyle();
  return (
    <div className={classnames(classes.container, className)}>
      <InputBase
        type="text"
        className={classes.textField}
        placeholder="search"
        value={inputText}
      />
      <Icon className={classes.icon} icon="mdi:magnify" width={24} />{" "}
    </div>
  );
}

const useStyle = makeStyles((theme) => ({
  container: {
    height: 30,
    minWidth: 215,
    maxWidth: 400,
    width: "50%",
    display: "flex",
    justifyContent: "space-Between",
    alignItems: "center",
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 12,
  },
  textField: {
    border: "none",
    "&::placeholder": {
      color: theme.palette.text.primary,
      fontSize: 16,
    },
    padding: 3,
  },
  icon: {
    color: theme.palette.text.primary,
  },
}));
