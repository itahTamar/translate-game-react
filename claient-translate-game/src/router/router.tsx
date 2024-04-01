import { createBrowserRouter } from "react-router-dom"
import LandingPage from "../view/LandingPage"
import LogInPage from "../view/LogInPage"
import RegisterPage from "../view/RegisterPage"

export const router = createBrowserRouter([
    {path: "/", element: <LandingPage/>},
    {path: "/register", element: <RegisterPage/>},
    {path: "/login", element: <LogInPage/>},

])