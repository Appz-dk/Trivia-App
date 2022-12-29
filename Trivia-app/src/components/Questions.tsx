import { useContext, useEffect, useState } from "react";
import { QuestionsContext } from "../App";
import classes from "./questions.module.css";
import Container from "./utils/Container";

const Questions = () => {
  const { questionsState, setQuestionsState } = useContext(QuestionsContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswers, setCurrentAnswers] = useState<string[]>([]);

  useEffect(() => {
    setQuestionsState([
      {
        category: "The category",
        correctAnswer: "This is a very long answer that has to fit inside of the button",
        id: "The-id",
        incorrectAnswers: ["Wrong1", "Wrong2", "Wrong3"],
        question: "The question is here and can sometimes be long",
      },
    ]);
  }, []);

  useEffect(() => {
    if (questionsState) {
      // Set current answers
      const answers = [
        questionsState[currentQuestion].correctAnswer,
        ...questionsState[currentQuestion].incorrectAnswers,
      ];
      // Sort the answers randomly
      answers.sort(() => (Math.random() > 0.5 ? 1 : -1));
      setCurrentAnswers(answers);
    }
  }, [currentQuestion, questionsState]);

  return (
    <Container>
      {questionsState && (
        <>
          <h1 className={classes["question-title"]}>{questionsState[currentQuestion].category}</h1>
          <div className={classes.question}>
            <p>{questionsState[currentQuestion].question}</p>
          </div>
          {currentAnswers.map((answer) => (
            <div key={answer} className={classes["question-answers"]}>
              <button>{answer}</button>
            </div>
          ))}
          <div>
            <button onClick={() => setCurrentQuestion((prev) => prev + 1)}>+1</button>
            <button onClick={() => setCurrentQuestion((prev) => prev - 1)}>-1</button>
          </div>
        </>
      )}
    </Container>
  );
};

export default Questions;
