import React from "react";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

const convertToDefaultEventPara = (name, value) => ({
  target: {
    name,
    value,
  },
});

export default function DateTimePicker(props) {
  const classes = useStyles();
  const {
    name,
    label,
    value,
    onChange,
    format = "dd/MM/yyyy",
    ...others
  } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDateTimePicker
        name={name}
        value={value}
        label={label}
        onChange={(date) => onChange(convertToDefaultEventPara(name, date))}
        format={format}
        {...others}
      ></KeyboardDateTimePicker>
    </MuiPickersUtilsProvider>
  );
}
