// need to add word cards component to render
// need to add a massage popup for correct/wrong answer

import { useEffect, useState } from "react";
import { getUserName, getUserScores } from "../api/users/userApi";

const PlayGame = () => {
  const [userName, setUserName] = useState("");
  const [score, setScore] = useState(0); //when the user chose the correct word the score increase with 1 point

  const handleFinish = () => {
    //at end of the game the score will saved to user DB-scores
  };

  const OnLoadGame = async () => {
    try {
      const response = await getUserName();
      if (!response) throw new Error("no user name from server");
      setUserName(response.data);
    } catch (error) {
      console.error("Error onLoad:", error);
    }
  };

  useEffect(() => {
    OnLoadGame();
  }, []);

  return (
    <>
      <div className="game">
        <div className="wrapper">
          <h1 className="username">Hello {userName}</h1>
          <h4 className="instruction">Match the word to its meaning</h4>
          <p>your score: {score}</p>
          <div className="wrapper">
            <div className="massage"></div> 
            <div className="cards" id="cards"></div>
            <br></br>
            <button className="finishBtn" onClick={handleFinish}>
              Finish
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayGame;
