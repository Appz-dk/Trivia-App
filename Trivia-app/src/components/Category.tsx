import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuestions } from "../api/getQuestions";
import { QuestionsContext, TQuestions } from "../App";
import classes from "./category.module.css";
import Container from "./utils/Container";

const DIFFICULTY = ["easy", "medium", "hard"];

const Category = () => {
  const { questionsState, setQuestionsState } = useContext(QuestionsContext);
  const { category } = useParams();
  const [questionsAmount, setQuestionsAmount] = useState<string>("1");
  const [difficulty, setDifficulty] = useState(DIFFICULTY[0]);

  const navigate = useNavigate();

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
    navigate(`/${category.toLowerCase()}/questions`);
  };

  return (
    <Container>
      <h1>{category}</h1>
      <p className={classes.instructions}>Please select the difficulty and amount of questions you would like to get</p>
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
              min="1"
              value={questionsAmount}
              max="10"
              id="questions"
              onChange={(e) => handleQuestionsAmountChange(e)}
              className={classes.slider}
            />
            <p className={classes["question-amount"]}>Limit: {questionsAmount}</p>
          </div>
          <div className={classes.action}>
            <button>Start Quiz</button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Category;
