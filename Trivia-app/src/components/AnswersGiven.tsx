import React from "react";
import { TAnswersGiven } from "./Questions";
import classes from "./answersGiven.module.css";

type TProps = {
  answersGiven: TAnswersGiven[];
};

const AnswersGiven: React.FC<TProps> = ({ answersGiven }) => {
  return (
    <>
      {answersGiven.map((answer) => (
        <div key={answer.question} className={classes.card}>
          <p>{answer.question}</p>
          <p>Correct answer: {answer.correctAnswer}</p>
          <p style={{ color: `${answer.correctAnswer != answer.answerGiven ? "red" : "green"}` }}>
            Answer given: {answer.answerGiven}
          </p>
        </div>
      ))}
    </>
  );
};

export default AnswersGiven;
