import React from "react";
import {
  FormControl,
  FormControlLabel,
  Checkbox as MuiCheckbox,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

const convertToDefaultEventPara = (name, value) => ({
  target: {
    name,
    value,
  },
});

export default function Checkbox(props) {
  const classes = useStyles();
  const {
    name,
    label = "",
    checked = false,
    onChange = (t) => {
      return;
    },
    className = null,
    ...others
  } = props;

  return (
    <FormControl className={className}>
      <FormControlLabel
        control={
          <MuiCheckbox
            name={name}
            checked={checked}
            onChange={(e) =>
              onChange(convertToDefaultEventPara(name, e.target.checked))
            }
            {...others}
          />
        }
        label={label}
      />
    </FormControl>
  );
}
