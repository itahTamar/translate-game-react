import { createBrowserRouter } from "react-router-dom"
import { TableTest } from "../components/TableTest"
import LandingPage from "../view/LandingPage"
import LogInPage from "../view/LogInPage"
import RegisterPage from "../view/RegisterPage"
import UserPage from "../view/UserPage"
import NewPlayGame from '../view/NewPlayGame';
import ResetPassword from "../components/ResetPassword"
import ForgotPassword from "../components/ForgotPassword"
import OTPInput from "../components/OTPInput"
import UpdateUserDetails from "../components/UpdateUserDetails"

export const router = createBrowserRouter([
    {path: "/", element: <LandingPage/>},
    {path: "/register", element: <RegisterPage/>},
    {path: "/login", element: <LogInPage/>},
    {path: "/userPage", element: <UserPage/>},
    {path: "/playGame", element: <NewPlayGame/>},
    {path: "/tableTest", element: <TableTest/>},
    {path: "/otpCode", element: <OTPInput/>},
    {path: "/forgotPassword", element: <ForgotPassword/>},
    {path: "/resetPassword", element: <ResetPassword/>},
    {path: "/updateUserDetails", element: <UpdateUserDetails/>},
])