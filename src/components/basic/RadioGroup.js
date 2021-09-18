import {
  FormControl,
  FormControlLabel,
  Radio,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  makeStyles,
  Grid,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({}));

export default function RadioGroup(props) {
  const classes = useStyles();
  const {
    name = null,
    label = "Radio Group",
    block = false,
    value = null,
    onChange = null,
    items = null,
    color = "secondary",
    row = true,
    ...others
  } = props;

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <MuiRadioGroup
        row={row}
        name={name}
        value={value}
        onChange={onChange}
        {...others}
        style={{ fontSize: "12px" }}
      >
        {items.map((item) => {
          {
            return block ? (
              <Grid container>
                <FormControlLabel
                  key={item.id}
                  value={item.id}
                  control={<Radio color={color} />}
                  label={item.title}
                />
              </Grid>
            ) : (
              <FormControlLabel
                key={item.id}
                value={item.id}
                control={<Radio color={color} />}
                label={item.title}
              />
            );
          }
        })}
      </MuiRadioGroup>
    </FormControl>
  );
}
