import { Box, FormControl, InputLabel, Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  handleCategoryChange,
  handleDifficultyChange,
  handleTypeChange,
} from "../store/actions";

const FieldOptions = (props) => {
  const { label, options } = props;
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  

    switch (label) {
      case "Category":
        dispatch(handleCategoryChange(e.target.value));
        break;
      case "Difficulty":
        dispatch(handleDifficultyChange(e.target.value));
        break;
      case "Type":
        dispatch(handleTypeChange(e.target.value));
        break;
      default:
        return;
    }

  };
  return (
    <Box mt={8}>
    <FormControl fullWidth>
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
