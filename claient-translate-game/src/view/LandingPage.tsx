import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "./../components/popup";
import Login from "./../components/login/Login";
import "../style/buttons.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const [showPopupLogin, setShowPopupLogin] = useState(false);

  return (
    <div>
      <h1>Vocabulary Game</h1>
      <div className="p-12">
        <button className="loginLP" onClick={() => setShowPopupLogin(true)}>
          Log in
        </button>
        {showPopupLogin && (
          <Popup onClose={() => setShowPopupLogin(false)}>
            <Login />
          </Popup>
        )}
        <p className="p-2">or</p>
        <button
          className="RegisterFirst"
          onClick={() => {
            navigate(`/register`);
          }}
        >
          Register
        </button>
      </div>

      <p>Practice your english in a fun vocabulary game</p>
    </div>
  );
};

export default LandingPage;
