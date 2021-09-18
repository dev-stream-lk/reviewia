import React from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import { FormHelperText } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 200,
    padding: 5,
  },
}));

export default function Select(props) {
  const classes = useStyles();
  const {
    name,
    label,
    value,
    onChange,
    size = "small",
    className,
    options,
    error = null,
    ...others
  } = props;
  return (
    <FormControl
      variant="outlined"
      size={size}
      className={`${classes.formControl} ${className}`}
      {...(error && { error: true })}
    >
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        name={name}
        onChange={onChange}
        value={value}
        label={label}
        {...others}
      >
        {options.map((op) => (
          <MenuItem key={op.id} value={op.id}>
            {op.title}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error} </FormHelperText>}
    </FormControl>
  );
}
