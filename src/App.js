import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import  About from "./pages/About";
import Profile from "./pages/Profile";
import Error404 from './pages/error404';

// LEVEL2
import {useContext } from "react";
import ThemeContext from "./context/Datacontext";
import Signup from "./pages/Signup";
import Signin from "pages/Signin";

// LEVEL3
import EditTask from "pages/edit-task/editTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <error404 />,
  },

  {
    path: "/signin",
    element: <Signin />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/edit-task",
    element: <EditTask />,
  },



  {
    path: "/about",
    element: <About />,
  },

  
  {
    path: "/profile",
    element: <Profile />,
  },
]);

function App() {
  const {theme} = useContext(ThemeContext);

  return (
    <div  className={`App ${theme}`}>
    <RouterProvider router={router} />
    </div>
  );
}

export default App;
