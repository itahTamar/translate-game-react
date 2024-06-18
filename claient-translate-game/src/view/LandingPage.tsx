import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "./../components/popup";
import Login from "./../components/login/Login";
import "../style/buttons.css";
import "../style/images/bgImg.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const [showPopupLogin, setShowPopupLogin] = useState(false);

  return (
    <div className="open-page">
      <div className="container">
        <h1 className="text-7xl mb-20 font-bold">Vocabulary Game</h1>
        <h2 className="text-3xl mb-5">Practice your vocabulary</h2>

        <div className="p-12">
          <button
            className="loginLP text-2xl font-medium hover:font-bold"
            onClick={() => setShowPopupLogin(true)}
          >
            Log in
          </button>
          {showPopupLogin && (
            <Popup onClose={() => setShowPopupLogin(false)}>
              <Login />
            </Popup>
          )}
          <p className="p-2 m-10 text-xl">or</p>
          <button
            className="RegisterFirst text-2xl font-medium hover:font-bold"
            onClick={() => {
              navigate(`/register`);
            }}
          >
            Sing up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
