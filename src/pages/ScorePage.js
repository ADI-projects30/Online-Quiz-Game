import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { handleAmountChange, handleScoreChange } from "../store/actions";
import Confetti from "react-confetti";
import '../App.css';
import '../styles/yourscore.css';



const ScorePage = () => {
  const disptach = useDispatch();
  const navigate = useNavigate()
  const { score } = useSelector((state) => state);

  const handleBackToSettings = () => {
    disptach(handleScoreChange(0));
    disptach(handleAmountChange(50));
    navigate("/");
  };

  return (
    <><div className="up"><Confetti /></div>
   
<div className="center middle">
<Box mt={5}>
{/* <Typography variant="h3" fontWeight="bold" mb={3}> */}
        your score is: {score}
      {/* </Typography> */}
      </Box>
      <Button color="error" onClick={handleBackToSettings} variant="outlined">
        Again?
       </Button>
    </div>
    </>
  );
};

export default ScorePage