import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "./../components/popup";
import Login from './../components/login/Login';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showPopupLogin, setShowPopupLogin] = useState(false);

  return (
    <div>
      <h1>Welcome to the Vocabulary game practice</h1>
      <p>If you haven't register yet, please do it here</p>
      <button
        onClick={() => {
          navigate(`/register`);
        }}
      >
        Register
      </button>
      <p>Or log-in to your Vocabulary game here</p>
      {/* <button onClick={() => {navigate(`/login`)}}>LogIn</button> */}
      <button className="login" onClick={() => setShowPopupLogin(true)}>
        Log in
      </button>
      {showPopupLogin && (
        <Popup onClose={() => setShowPopupLogin(false)}>
          <Login />
        </Popup>
      )}
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
