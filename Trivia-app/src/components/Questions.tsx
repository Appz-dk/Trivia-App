import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionsContext } from "../App";
import classes from "./questions.module.css";
import Container from "./utils/Container";

const Questions = () => {
  const { questionsState, setQuestionsState } = useContext(QuestionsContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswers, setCurrentAnswers] = useState<string[]>([]);
  const [correctAnswersAmount, setCorrectAnswersAmount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    // setQuestionsState([
    //   {
    //     category: "The category",
    //     correctAnswer: "This is a very long answer that has to fit inside of the button",
    //     id: "The-id",
    //     incorrectAnswers: ["Wrong1", "Wrong2", "Wrong3"],
    //     question: "The question is here and can sometimes be long",
    //   },
    // ]);
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

  const handleAnswerQuestion = (answer: string) => {
    // Check if answer was correct
    if (questionsState && questionsState[currentQuestion].correctAnswer === answer) {
      // update correct answers amount
      setCorrectAnswersAmount((amount) => amount + 1);
    }
    // update what question to display
    setCurrentQuestion((currentQuestion) => currentQuestion + 1);

    // Check if last question
    if (questionsState && currentQuestion === questionsState?.length - 1) {
      // No more questions so
      const answersAmount = questionsState.length;
      // set questionState back to null.
      setQuestionsState(null);
      // set currentQuestion back to 0 ?? Maybe not necessary
      // set current answer back to empty [] ??
      // return redirect to "/questions/answers" page
      return navigate("/questions/answers", {
        state: {
          correctAnswersAmount,
          answersAmount,
        },
      });
    }
  };

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
              <button onClick={() => handleAnswerQuestion(answer)}>{answer}</button>
            </div>
          ))}
        </>
      )}
    </Container>
  );
};

export default Questions;
