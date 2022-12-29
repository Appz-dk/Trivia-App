import React from "react";
import { useNavigate } from "react-router-dom";
import AnswersGiven from "./AnswersGiven";
import { TAnswersGiven } from "./Questions";
import classes from "./quizOver.module.css";

type TProps = {
  correctAnswersAmount: number;
  currentQuestion: number;
  showAnswers: boolean;
  setShowAnswers: React.Dispatch<React.SetStateAction<boolean>>;
  answersGiven: TAnswersGiven[];
};

const QuizOver: React.FC<TProps> = ({
  correctAnswersAmount,
  currentQuestion,
  showAnswers,
  setShowAnswers,
  answersGiven,
}) => {
  const navigate = useNavigate();

  const perfectScore = correctAnswersAmount === currentQuestion + 1;
  const greatJob = !perfectScore && correctAnswersAmount >= Math.round((currentQuestion + 1) / 2);
  const betterLuck = !perfectScore && !greatJob;
  return (
    <>
      <div className={classes.box}>
        <div>
          {perfectScore && <p>Perfect Score!</p>}
          {greatJob && <p>Great job!</p>}
          {betterLuck && <p>Better luck next time...</p>}
          <p>
            You had {correctAnswersAmount}/{currentQuestion + 1} correct Answers!
          </p>
        </div>
        <div className={classes.action}>
          <button onClick={() => setShowAnswers((showAnswers) => !showAnswers)}>
            {showAnswers ? "Hide" : "Show"} Answers
          </button>
          <button onClick={() => navigate("/")}>Back to categories</button>
        </div>
        {showAnswers && <AnswersGiven answersGiven={answersGiven} />}
      </div>
    </>
  );
};

export default QuizOver;
