import { createBrowserRouter } from "react-router-dom"
import LandingPage from "../view/LandingPage"
import LogInPage from "../view/LogInPage"
import RegisterPage from "../view/RegisterPage"
import UserPage from "../view/UserPage"
import PlayGame from "../view/PlayGame"

export const router = createBrowserRouter([
    {path: "/", element: <LandingPage/>},
    {path: "/register", element: <RegisterPage/>},
    {path: "/login", element: <LogInPage/>},
    {path: "/userPage", element: <UserPage/>},
    {path: "/playGame", element: <PlayGame/>}
])