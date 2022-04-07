import { useEffect, useState } from "react";
import { skipQuestion } from "../store/actions";
import { useDispatch } from "react-redux";


const Timer = ({ setTimeOut, questionNumber }) => {
const dispatch = useDispatch()

    const [timer, setTimer] = useState(5);
    useEffect(() => {
        if (timer === 0) dispatch(skipQuestion());
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


