import "./App.css";
import Categories from "./components/Categories";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Category from "./components/Category";

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
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
