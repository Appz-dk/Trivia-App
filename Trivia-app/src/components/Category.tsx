import React, { useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./category.module.css";
import Contaier from "./utils/Contaier";

// https://the-trivia-api.com/api/questions?categories=arts_and_literature&limit=5&difficulty=easy

const DIFFICULTY = ["easy", "medium", "hard"];
const AMOUNT_OF_QUESTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Category = () => {
  const { category } = useParams();
  const [questionsAmount, setQuestionsAmount] = useState<string>("1");
  const [difficulty, setDifficulty] = useState("easy");

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value);
  };

  const handleQuestionsAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionsAmount(e.target.value);
  };

  const handleGetQuestions = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNumber = Number(questionsAmount);
    const invalidInput = !difficulty || !amountNumber || amountNumber < 1 || amountNumber > 10;
    if (invalidInput) {
      // TODO Add UI alert
      return console.log("Invalid Form input!");
    }

    return;
  };

  return (
    <Contaier>
      <h1>{category}</h1>
      <div>
        <form className={classes["form-container"]} onSubmit={(e) => handleGetQuestions(e)}>
          <div className={classes["form-input"]}>
            <label htmlFor="difficulty">Difficulty</label>
            <select name="difficulty" id="difficulty" value={difficulty} onChange={(e) => handleDifficultyChange(e)}>
              {DIFFICULTY.map((diff) => (
                <option key={diff} value={diff}>
                  {diff}
                </option>
              ))}
            </select>
          </div>
          <div className={`${classes["form-input"]} ${classes.relative}`}>
            <label htmlFor="questions">Amount Of Questions</label>
            <input
              type="range"
              min="0"
              value={questionsAmount}
              max="11"
              id="questions"
              onChange={(e) => handleQuestionsAmountChange(e)}
              className={classes.slider}
            />
            <p className={classes["question-amount"]}>Limit: {questionsAmount}</p>
          </div>
          <div className={classes.action}>
            <button>Get Questions</button>
          </div>
        </form>
      </div>
    </Contaier>
  );
};

export default Category;
