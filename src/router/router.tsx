import { createBrowserRouter } from "react-router-dom"
import { TableTest } from "../components/TableTest"
import LandingPage from "../view/LandingPage"
import LogInPage from "../view/LogInPage"
// import PlayGame from "../view/PlayGame"
import RegisterPage from "../view/RegisterPage"
import UserPage from "../view/UserPage"
import NewPlayGame from '../view/NewPlayGame';

export const router = createBrowserRouter([
    {path: "/", element: <LandingPage/>},
    {path: "/register", element: <RegisterPage/>},
    {path: "/login", element: <LogInPage/>},
    {path: "/userPage", element: <UserPage/>},
    // {path: "/playGame", element: <PlayGame/>},
    {path: "/playGame", element: <NewPlayGame/>},
    {path: "/tableTest", element: <TableTest/>}

])