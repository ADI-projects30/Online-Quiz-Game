import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { decode } from "html-entities";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import GetApiData from "../hooks/GetApiData";
import { handleScoreChange } from "../store/actions";
import Timer from "../hooks/Timer"
import useSound from 'use-sound';
import success from "../sounds/success.mp3";
import failure from "../sounds/failure.mp3";

import '../styles/questions.css';
import '../App.css';


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
console.log(apiUrl)
  const { response } = GetApiData({ url: apiUrl });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [optionsFifty, setOptionsFifty] = useState([]);
  const [timeOut, setTimeOut] = useState(false);
  const [correctAnswer] = useSound(success);
  const [wrongAnswer] = useSound(failure);
  const [isRight, setIsRight] = useState('default');

  useEffect(() => {
    if (response !== undefined && response.results !== undefined){
    if (response && response.results.length) {
      const question = response.results[questionIndex];
      let answers = [...question.incorrect_answers];
      let fiftyFifty = [[...question.incorrect_answers][getRandomInt(question.incorrect_answers.length)]];
      fiftyFifty.splice(
        getRandomInt(2),
        0,
        question.correct_answer
      );
      setOptionsFifty(fiftyFifty)
      if (answers.length > 2) {
      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setOptions(answers);
      } else {
        setOptions(fiftyFifty)
      }
    }
  }
  }, [response, questionIndex]);


  if (timeOut) {
     if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1);
     setTimeOut(false)
    } else {
      navigate("/yourscore");
    }
  }

  const handleClickAnswer = (e) => {
    const question = response.results[questionIndex];
    if (e.target.textContent === question.correct_answer) {
      dispatch(handleScoreChange(score + 1));
      correctAnswer();
        setIsRight('right');
    } else {wrongAnswer(); 
        setIsRight('wrong');  
    };
    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      navigate("/yourscore");
    }
  };


  const handleFiftyFifty = (e) => {
    if (options !== undefined && options.length !== 2) {
      setOptions(optionsFifty)
    }
  };

  return (
    <div className="html">
      {response.results!==undefined && response.results[questionIndex] === undefined ? navigate("/notfound") :
    <Box className="center">
      <Box mt={5}>
        {response.results!==undefined && decode(response.results[questionIndex].question)}
      </Box>
      <div className="answers">
        {options && options.map((data, id) => (
          <Box mt={2} key={id}>
            <Button className={["answer", isRight==='default' ? 'default' : isRight==='right' ? 'right' : 'wrong']} onClick={handleClickAnswer} variant="contained">
              {decode(data)}
            </Button>
          </Box>
        ))}
      </div>
      <Box mt={5}>
        Score: {score} / {response.results!==undefined && response.results.length}
      </Box>
      <div >
        <div className="timer">
          <Timer
            setTimeOut={setTimeOut}
            questionNumber={questionIndex}
          />
        </div>
      </div>
      <Box mt={2}>
          <Button className="clue" variant="contained" onClick={handleFiftyFifty}>
            Want a clue?
            50/50
          </Button>
        </Box>
    </Box>
  }
    </div>
  );
};

export default QuestionsPage