import { Box, FormControl, InputLabel, Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  handleChangeCategory,
  handleChangeDifficulty,
  handleChangeType,
} from "../store/actions";
import '../styles/options.css';


const FieldOptions = (props) => {
  const { label, options } = props;
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  

    switch (label) {
      case "Choose category":
        dispatch(handleChangeCategory(e.target.value));
        break;
      case "Choose difficulty":
        dispatch(handleChangeDifficulty(e.target.value));
        break;
      case "Choose type":
        dispatch(handleChangeType(e.target.value));
        break;
      default:
        return;
    }

  };
  return (
    <Box mt={8}>
    <FormControl fullWidth={true} margin="none">
        <InputLabel> {label} </InputLabel>
        <Select value={value} label={label} onChange={handleChange}>
        {options && options.map(({ id, name }) => (
            <MenuItem value={id} key={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
    </FormControl>
</Box>
  );
};

export default FieldOptions
