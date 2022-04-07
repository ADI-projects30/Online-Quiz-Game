import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { decode } from "html-entities";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import GetApiData from "../hooks/GetApiData";
import { handleScoreChange, skipQuestion } from "../store/actions";
import Timer from "../hooks/Timer"
import '../styles/questions.css';

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const QuestionsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    question_category,
    question_difficulty,
    question_type,
    amount_of_question,
    score,
  } = useSelector((state) => state);
  console.log('ffff')
  console.log(amount_of_question, question_category, question_difficulty, question_type);


  let apiUrl = `/api.php?amount=${amount_of_question}`;
  if (question_category) {
    apiUrl = apiUrl.concat(`&category=${question_category}`);
  }
  if (question_difficulty) {
    apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`);
  }
  if (question_type) {
    apiUrl = apiUrl.concat(`&type=${question_type}`);
  }

  const { response, error, loading } = GetApiData({ url: apiUrl });
  console.log('bbbbb')
  console.log(response.results)
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [timeOut, setTimeOut] = useState(false);

  useEffect(() => {
    // console.log('eeee')
    if (response !== undefined && response.results !== undefined){
      console.log(response.results)
    if (response && response.results.length) {
      const question = response.results[questionIndex];
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setOptions(answers);
      // setQuestions(question);

    }
  }
  }, [response, questionIndex]);
console.log(timeOut)
  if (timeOut) {
    //  setQuestionIndex(questionIndex + 1)
    //  setTimeOut(false)
     if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1);
     setTimeOut(false)
    } else {
      navigate("/score");
    }
  }
  
  // if (loading) {
  //   return (
  //     <Box mt={20}>
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  const handleClickAnswer = (e) => {
    const question = response.results[questionIndex];
    if (e.target.textContent === question.correct_answer) {
      dispatch(handleScoreChange(score + 1));
    }

    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      navigate("/score");
    }
  };

  // const handleTimeOver  = () => {
  //   dispatch(skipQuestion(questionIndex + 1));
  //   console.log('4444')
  //   setQuestionIndex(questionIndex + 1)
  //   }

  return (
    <Box>
      <Typography variant="h4">Questions </Typography>
      <Typography mt={5}> 
        {response.results!==undefined && decode(response.results[questionIndex].question)}
      </Typography>
      
      <div className="top">
                  <div className="timer">
                    <Timer
                      setTimeOut={setTimeOut}
                      questionNumber={questionIndex}
                    />
                  </div>
                </div>
       {options && options.map((data, id) => (
        <Box mt={2} key={id}>
          <Button onClick={handleClickAnswer} variant="contained">
            {decode(data)}
          </Button>
        </Box>
      ))}
      <Box mt={5}>
        Score: 2/6
        {/* Score: {score} / {response.results.length} */}
      </Box>
    </Box>
  );
};

export default QuestionsPage