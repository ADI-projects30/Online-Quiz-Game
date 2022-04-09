import { Box, Button, TextField } from "@mui/material"
import FieldOptions from "../templates/FieldOptions"
import GetApiData from "../hooks/GetApiData";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleAmountChange } from "../store/actions";
import '../App.css';
// import '../styles/options.css';


const OptionsPage = () => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(handleAmountChange(e.target.value));
  };
  const { response } = GetApiData({ url: "/api_category.php" });
  const navigate = useNavigate();
 

  const difficultyOptions = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];

  const typeOptions = [
    { id: "multiple", name: "Multiple Choise" },
    { id: "boolean", name: "True/False" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/questions");
  };

  return (
    <div className="html">
    <form className="center fromtop" onSubmit={handleSubmit}>
      <FieldOptions options={response.trivia_categories} label="Category" />
      <FieldOptions options={difficultyOptions} label="Difficulty" />
      <FieldOptions options={typeOptions} label="Type" />
      <TextField color="error" focused fullWidth  margin="dense" mt={3} id="filled-basic" label="Number of questions?" variant="outlined" inputProps={{ type: 'number'}} onChange={handleChange}/>
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
