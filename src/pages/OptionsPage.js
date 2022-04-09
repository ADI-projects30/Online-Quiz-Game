import { Box, Button, TextField } from "@mui/material"
import FieldOptions from "../templates/FieldOptions"
import GetApiData from "../hooks/GetApiData";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleQuestionsAmountChange } from "../store/actions";

import '../styles/options.css';
import '../App.css';

const OptionsPage = () => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(handleQuestionsAmountChange(e.target.value));
  };
  const { response } = GetApiData({ url: "/api_category.php" });
  const navigate = useNavigate();
 

  const difficultyOptions = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];

  const typeOptions = [
    { id: "multiple", name: "Multiple Choice" },
    { id: "boolean", name: "True/False" },
  ];

  const handleStart = (e) => {
    e.preventDefault();
    navigate("/questions");
  };

  return (
    <div className="html">
    <form className="center fromtop" onSubmit={handleStart}>
      <FieldOptions options={response.trivia_categories} label="Choose category" />
      <FieldOptions options={difficultyOptions} label="Choose difficulty" />
      <FieldOptions options={typeOptions} label="Choose type" />
      <TextField color="error" focused fullWidth  margin="dense" mt={3} id="filled-basic" label="Number of questions?" variant="outlined" inputProps={{ type: 'number', min: 1, max: 50}} onChange={handleChange}/>
      <Box mt={3} width="100%">
        <Button color="error" fullWidth variant="contained" type="submit">
          Do you have what it takes?
        </Button>
      </Box>

    </form>
    </div>
  )
}

export default OptionsPage
