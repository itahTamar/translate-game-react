import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "./../components/popup";
import Login from './../components/login/Login';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showPopupLogin, setShowPopupLogin] = useState(false);

  return (
    <div>
      <h1>Vocabulary Game</h1>
      <button className="login" onClick={() => setShowPopupLogin(true)}>
        Log in
      </button>
      {showPopupLogin && (
        <Popup onClose={() => setShowPopupLogin(false)}>
          <Login />
        </Popup>
      )}
      <p>or</p>
      <button
        onClick={() => {
          navigate(`/register`);
        }}
      >
        Register first
      </button>
         
      <p>
        In this game you can practice your english vocabulary. You'll be
        presented with one English word and three possible interpretations, you
        must choose the appropriate interpretation for the word. For a correct
        choice you will get a point.
      </p>
    </div>
  );
};

export default LandingPage;
