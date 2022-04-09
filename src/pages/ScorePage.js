import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  handleQuestionsAmountChange,
  handleScoreChange,
  handleChangeCategory,
  handleChangeDifficulty,
  handleChangeType } from "../store/actions";
import Confetti from "react-confetti";
import '../App.css';
import '../styles/yourscore.css';



const ScorePage = () => {
  const disptach = useDispatch();
  const navigate = useNavigate()
  const { score } = useSelector((state) => state);

  const handleGoSettings = () => {
    disptach(handleScoreChange(0));
    disptach(handleQuestionsAmountChange(50));
    disptach(handleChangeDifficulty(""));
    disptach(handleChangeCategory(""));
    disptach(handleChangeType(""));
    navigate("/");
  };

  return (
    <><div className="up"><Confetti /></div>
   
    <div className="center middle">
      <Box mt={5}>
        You achieved {score}% , Can you beat your own score?
      </Box>
      <div className="beginning">
        <Button color="error" onClick={handleGoSettings} variant="outlined">
          Again?
        </Button>
       </div>
    </div>
    </>
  );
};

export default ScorePage