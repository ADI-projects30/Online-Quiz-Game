import { Box, Button, TextField, Typography } from "@mui/material"
import FieldOptions from "../templates/FieldOptions"
import GetApiData from "../hooks/GetApiData";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleAmountChange } from "../store/actions";
import { useEffect, useState } from "react";

const OptionsPage = () => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(handleAmountChange(e.target.value));
  };
  const { response, error, loading } = GetApiData({ url: "/api_category.php" });
 
  // const [response, setResponse] = useState([])
  // useEffect(() => {
  //   async function fetchUnits() {
  //   const fetchResult = await fetch('https://opentdb.com/api_category.php');
  //   const data = await fetchResult.json();
  //   // console.log(data);
  //   setResponse(data);
  //   }
  //   fetchUnits();
  // }, []);
  
  const navigate = useNavigate();
  // if (loading) {
  //   return (
  //     <Box mt={20}>
  //       <CircularProgress />
  //     </Box>
  //   );
  // }
  console.log('aaaaa')
// console.log(response.trivia_categories)
  // if (error) {
  //   return (
  //     <Typography variant="h6" mt={20} color="red">
  //       Some Went Wrong! 
  //     </Typography>
  //   );
  // }

  

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
    
    <form onSubmit={handleSubmit}>
      <FieldOptions options={response.trivia_categories} label="Category" />
      <FieldOptions options={difficultyOptions} label="Difficulty" />
      <FieldOptions options={typeOptions} label="Type" />
      <TextField id="filled-basic" label="How many questions?" variant="outlined" type="number" onChange={handleChange}/>
      <Box mt={3} width="100%">
        <Button fullWidth variant="contained" type="submit">
          Get Started
        </Button>
      </Box>

    </form>
    
  )
}

export default OptionsPage