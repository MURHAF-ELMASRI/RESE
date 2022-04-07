import { makeStyles } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import SelectMui from "@material-ui/core/Select";
import classnames from "classnames";
import { FormikHandlers } from "formik";
import { uniqueId } from "lodash";
import React, { useState } from "react";

export default React.memo(Select);

interface Props<V = any> {
  label: string;
  data: {
    title: string;
    value: V;
  }[];
  value: V;
  onChange: FormikHandlers["handleChange"];
  name: string;
  helperText?: string;
  variant?: "filled" | "outlined" | "standard";
  className?: string;
}

function Select(props: Props) {
  const {
    data,
    onChange,
    value,
    label,
    helperText,
    variant = "outlined",
    className,
    name,
  } = props;
  const classes = useStyle();
  const [id] = useState(uniqueId());

  return (
    <FormControl
      variant={variant}
      className={classnames(classes.formControl, className)}
    >
      <InputLabel id={id}>{label}</InputLabel>
      <SelectMui
        label={label}
        labelId={id}
        onChange={onChange}
        value={value}
        name={name}
      >
        {data.map((row, idx) => (
          <MenuItem key={idx} value={row.value}>
            {row.title}
          </MenuItem>
        ))}
      </SelectMui>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}

const useStyle = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
}));
