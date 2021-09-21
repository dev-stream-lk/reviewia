import React from "react";
import {
  KeyboardDatePicker,
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

export default function DatePicker(props) {
  const classes = useStyles();
  const {
    name,
    label,
    value,
    onChange,
    format = "dd/MM/yyyy",
    minDate,
    maxDate= new Date(),
    ...others
  } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        name={name}
        value={value}
        label={label}
        maxDate={maxDate}
        minDate={minDate}
        onChange={(date) => onChange(convertToDefaultEventPara(name, date))}
        format={format}
        {...others}
      ></KeyboardDatePicker>
    </MuiPickersUtilsProvider>
  );
}
