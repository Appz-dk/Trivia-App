import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestions } from "../api/getQuestions";
import { QuestionsContext, TQuestions } from "../App";
import classes from "./category.module.css";
import Contaier from "./utils/Contaier";

// https://the-trivia-api.com/api/questions?categories=arts_and_literature&limit=5&difficulty=easy

const DIFFICULTY = ["easy", "medium", "hard"];

const Category = () => {
  const { questionsState, setQuestionsState } = useContext(QuestionsContext);
  const { category } = useParams();
  const [questionsAmount, setQuestionsAmount] = useState<string>("1");
  const [difficulty, setDifficulty] = useState(DIFFICULTY[0]);

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value);
  };

  const handleQuestionsAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionsAmount(e.target.value);
  };

  const handleGetQuestions = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountNumber = Number(questionsAmount);
    const invalidInput = !category || !difficulty || !amountNumber || amountNumber < 1 || amountNumber > 10;
    if (invalidInput) {
      // TODO Add UI alert
      return console.log("Invalid Form input!");
    }
    // Convert category to accepted string by api
    const categoryToReqest = category?.replace(" & ", "_and_").toLowerCase().split(" ").join("_");

    // Send request to API for getting questions
    const { data } = await getQuestions({ categoryToReqest, questionsAmount, difficulty });
    // Only keep questions data we need
    const questionsData = data.map((question: TQuestions) => ({
      category: question.category,
      correctAnswer: question.correctAnswer,
      id: question.id,
      incorrectAnswers: question.incorrectAnswers,
      question: question.question,
    }));
    // Store questions in questionsContext
    setQuestionsState([...questionsData]);

    // Redirect to questions page
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
