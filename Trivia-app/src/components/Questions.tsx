import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionsContext } from "../App";
import classes from "./questions.module.css";
import Container from "./utils/Container";

type TAnswersGiven = {
  question: string;
  correctAnswer: string;
  answerGiven: string;
};

const Questions = () => {
  const { questionsState, setQuestionsState } = useContext(QuestionsContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswers, setCurrentAnswers] = useState<string[]>([]);
  const [correctAnswersAmount, setCorrectAnswersAmount] = useState(0);
  const [answersGiven, setAnswersGiven] = useState<TAnswersGiven[]>([]);
  const [quizIsOver, setQuizIsOver] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const navigate = useNavigate();

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

  const handleAnswerQuestion = (answer: string) => {
    if (!questionsState) return;

    // Keep track of answers given
    setAnswersGiven((prevState) => [
      ...prevState,
      {
        question: questionsState[currentQuestion].question,
        correctAnswer: questionsState[currentQuestion].correctAnswer,
        answerGiven: answer,
      },
    ]);

    // Check if answer was correct
    if (questionsState[currentQuestion].correctAnswer === answer) {
      setCorrectAnswersAmount((amount) => amount + 1);
    }

    // Check if last question
    if (currentQuestion === questionsState?.length - 1) {
      setQuizIsOver(true);
      setQuestionsState(null);
      return;
    }
    // update what question to display
    setCurrentQuestion((currentQuestion) => currentQuestion + 1);
  };

  const perfectScore = correctAnswersAmount === currentQuestion + 1;
  const greatJob = currentQuestion + 1 > 2 && correctAnswersAmount > Math.floor((currentQuestion + 1) / 2);
  const betterLuck = correctAnswersAmount <= Math.floor((currentQuestion + 1) / 2);

  return (
    <Container>
      {questionsState && !quizIsOver && (
        <>
          <h1 className={classes["question-title"]}>{questionsState[currentQuestion].category}</h1>
          <div className={classes.question}>
            <p>{questionsState[currentQuestion].question}</p>
          </div>
          {currentAnswers.map((answer) => (
            <div key={answer} className={classes["question-answers"]}>
              <button onClick={() => handleAnswerQuestion(answer)}>{answer}</button>
            </div>
          ))}
        </>
      )}
      {!questionsState && quizIsOver && (
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
            <button onClick={() => setShowAnswers((prev) => !prev)}>{showAnswers ? "Hide" : "Show"} Answers</button>
            <button onClick={() => navigate("/")}>Back to categories</button>
          </div>
          {showAnswers && (
            <div>
              {answersGiven.map((answer) => (
                <div key={answer.question} className={classes.card}>
                  <p>{answer.question}</p>
                  <p>Correct answer: {answer.correctAnswer}</p>
                  <p style={{ color: `${answer.correctAnswer != answer.answerGiven ? "red" : "green"}` }}>
                    Answer given: {answer.answerGiven}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default Questions;
