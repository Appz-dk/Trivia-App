import { createContext, Dispatch, SetStateAction, useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Answers from "./components/Answers";
import Categories from "./components/Categories";
import Category from "./components/Category";
import Questions from "./components/Questions";

const AppLayout = () => (
  <>
    <Outlet />
  </>
);

// children: [...components]
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Categories />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/categories/:category",
        element: <Category />,
      },
      {
        path: "/questions",
        element: <Questions />,
      },
      {
        path: "/questions/answers",
        element: <Answers />,
      },
    ],
  },
]);

export type TQuestions = {
  category: string;
  correctAnswer: string;
  id: string;
  incorrectAnswers: string[];
  question: string;
};

type TQuestionsContext = {
  questionsState: TQuestions[] | null;
  setQuestionsState: React.Dispatch<React.SetStateAction<TQuestions[] | null>>;
};

const TQuestionsContextState = {
  questionsState: null,
  setQuestionsState: () => {},
};

export const QuestionsContext = createContext<TQuestionsContext>(TQuestionsContextState);

function App() {
  const [questionsState, setQuestionsState] = useState<TQuestions[] | null>(null);
  return (
    <QuestionsContext.Provider value={{ questionsState, setQuestionsState }}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </QuestionsContext.Provider>
  );
}

export default App;
