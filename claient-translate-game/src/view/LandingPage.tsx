import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate()
  return (
    <div>
      <h1>Welcome to the Vocabulary game practice</h1>
      <p>If you haven't register yet, please do it here</p>
      <button onClick={() => {navigate(`/register`)}}>Register</button>
      <p>Or log-in to your Vocabulary game here</p>
      <button onClick={() => {navigate(`/login`)}}>LogIn</button>
      <p>
        In this game you can practice your english vocabulary. You'll
        be presented with one English word and three possible
        interpretations, you must choose the appropriate interpretation for the
        word. For a correct choice you will get a point.
      </p>
    </div>
  );
};

export default LandingPage;
