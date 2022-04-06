import { useEffect, useState } from "react";
import { skipQuestion } from "../store/actions";


const Timer = ({ setTimeOut, questionNumber }) => {
    const [timer, setTimer] = useState(5);
    useEffect(() => {
        if (timer === 0) skipQuestion();
        console.log(timer)
        if (timer === 0) return setTimeOut(true);
        const interval = setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
      }, [timer, setTimeOut]);
      
      useEffect(() => {
        setTimer(5);
      }, [questionNumber]);
      return timer;
}

export default Timer


