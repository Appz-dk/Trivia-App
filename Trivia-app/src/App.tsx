import React, { createContext, useState } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "./App.css";
import Categories from "./components/Categories";
import Category from "./components/Category";
import Questions from "./components/Questions";

const BASE_URL = "Trivia-App/";

const router = createBrowserRouter(
  [
    {
      index: true,
      element: <Navigate to="/categories" replace />,
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
      path: "/:category/questions",
      element: <Questions />,
    },
  ],
  {
    basename: "/Trivia-App",
  }
);

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
