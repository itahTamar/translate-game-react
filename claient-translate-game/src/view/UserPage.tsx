// 1) render a list of all user words, with the option to update or delete a word (like in the books project) ->done
// 2) Add a new word form in popup -> done
// 3) render the user highest score -> done
// 4) Start paly button -> done
// 5) Log-out button will move the user back to landing page and delete the data from cookie -> done
// 6) make the render-word a lazy-load

import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { getUserHighScore } from "./../api/users/userApi";
import Popup from "./../components/popup";
import AddWord from "./../components/words/AddWord";
import "../style/buttons.css";

const UserPage = () => {
  const [highScore, setHighScore] = useState<number>();
  const [showPopupAddWord, setShowPopupAddWord] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleGetUserHighScore = async () => {
    try {
      const response: number = await getUserHighScore();
      console.log("at userPage/handleGetUserHighScore the response:", response);
      console.log(
        "at userPage/handleGetUserHighScore the user in context:",
        user
      );
      if (!response && response != 0)
        throw new Error(
          "No response from axios getHighestUserScores at handleGetUserHighScore"
        );
      setHighScore(response);
      console.log(
        "at userPage/handleGetUserHighScore the highScore:",
        highScore
      );
    } catch (error) {
      console.error(error, "at handleGetUserHighScore got a catch");
    }
  }; //work ok

  useEffect(() => {
    handleGetUserHighScore();
  }, []);

  const handleLogout = () => {
    Cookies.remove("user");
    navigate("/");
  };

  return (
    <>
      <div className="container">
        <h1>Welcome {user}</h1>
        <p>Your Highest Score: {highScore}</p>
        <button
          className="play"
          onClick={() => {
            navigate("/playGame/");
          }}
        >
          Play Now
        </button>
      </div>
      <button
        onClick={() => setShowPopupAddWord(true)}
        style={{ textDecoration: "line-through" }}
      >
        Add new Word
      </button>
      {showPopupAddWord && (
        <Popup onClose={() => setShowPopupAddWord(false)}>
          <AddWord />
        </Popup>
      )}
      <div>
        <button
          onClick={() => {
            navigate("/settings");
          }}
        >
          Settings
        </button>
      </div>
      <button className="logout" onClick={handleLogout}>
        LogOut
      </button>
    </>
  );
};

export default UserPage;
