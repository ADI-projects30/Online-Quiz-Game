import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { handleQuestionsAmountChange, handleScoreChange } from "../store/actions";
import '../App.css';
import '../styles/yourscore.css';


const ChooseOtherPage = () => {
  const disptach = useDispatch();
  const navigate = useNavigate()

  const handleGoSettings = () => {
    disptach(handleScoreChange(0));
    disptach(handleQuestionsAmountChange(50));
    navigate("/");
  };

  return (
    <div className="center middle">
      <Box mt={5}>
      The option you selected does not exist, please try again
      </Box>
      <div className="beginning">
        <Button color="error" onClick={handleGoSettings} variant="outlined">
            Again?
        </Button>
      </div>
    </div>
  );
};

export default ChooseOtherPage