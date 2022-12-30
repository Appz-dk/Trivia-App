import { useContext, useEffect, useState } from "react";
import { QuestionsContext } from "../App";
import AnswersGiven from "./AnswersGiven";
import classes from "./questions.module.css";
import QuizOver from "./QuizOver";
import Container from "./utils/Container";

export type TAnswersGiven = {
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
        <QuizOver
          correctAnswersAmount={correctAnswersAmount}
          currentQuestion={currentQuestion}
          showAnswers={showAnswers}
          setShowAnswers={setShowAnswers}
          answersGiven={answersGiven}
        />
      )}
    </Container>
  );
};

export default Questions;
