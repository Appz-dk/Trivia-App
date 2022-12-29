import { useLocation, useNavigate } from "react-router-dom";
import Container from "./utils/Container";
import classes from "./answers.module.css";

const Answers = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { correctAnswersAmount, answersAmount } = location.state;
  return (
    <Container>
      <div className={classes.box}>
        <div>
          {correctAnswersAmount === answersAmount && <p>Perfect Score!</p>}
          {answersAmount > 2 && correctAnswersAmount > Math.floor(answersAmount / 2) && <p>Great job!</p>}
          {correctAnswersAmount <= Math.floor(answersAmount / 2) && <p>Better luck next time...</p>}
          <p>
            You had {correctAnswersAmount}/{answersAmount} correct Answers!
          </p>
        </div>
        <div className={classes.action}>
          <button onClick={() => navigate("/")}>Back to categories</button>
        </div>
      </div>
    </Container>
  );
};

export default Answers;
