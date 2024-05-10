// 1) render a list of all user words, with the option to update or delete a word (like in the books project) ->done
// 2) Add a new word form in popup -> done
// 3) render the user highest score -> done
// 4) Start paly button -> done
// 5) Log-out button will move the user back to landing page and delete the data from cookie -> done
// 6) make the render-word a lazy-load

import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteWordById, getAllUserWord } from "../api/users/wordApi";
import PopupAddWord from "../components/words/PopupAddWord";
import PopupUpdateWord from "../components/words/PopupUpdateWord";
import { UserContext } from "../context/userContext";
import { Word } from "../types/words";
import { getUserHighScore } from './../api/users/userApi';

const UserPage = () => {
  const [wordList, setWordList] = useState<Word[]>([]);
  const [filterWordsList, setFilterWordsList] = useState<Word[]>([]);
  const [showPopupUpdateWord, setShowPopupUpdateWord] = useState(false);
  const [showPopupAddWord, setShowPopupAddWord] = useState(false);
  const [highScore, setHighScore] = useState<number>();
  const [show, setShow] = useState(false);
  const [massage, setMassage] = useState("Handle your words");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleGetAllUserWords = async () => {
    try {
      const response = await getAllUserWord();
      if (!response)
        throw new Error(
          "No response from axios getAllUserWord at handleGetAllUserWords"
        );
      setWordList(response);
      setFilterWordsList(response);
    } catch (error) {
      console.error(error);
    }
  }; //work ok

  const handleGetUserHighScore = async () => {
    try {
      console.log("at load userPage the wordList is:", wordList)
      const response: number = await getUserHighScore();
      console.log("at userPage/handleGetAllUserWords the response:", response)
      if (!response && response!=0)
        throw new Error(
          "No response from axios getHighestUserScores at handleGetUserHighScore"
        );
      setHighScore(response); 
      console.log("at userPage/handleGetAllUserWords the highScore:", highScore)
      
    } catch (error) {
      console.error(error, "at handleGetUserHighScore got a catch");
    }
  }; //work ok

  useEffect(() => {
    handleGetUserHighScore();
  }, []);

  useEffect(() => {
    handleGetAllUserWords();
  }, [show]);

  const handleDeleteWord = async (wordId: string) => {
    if (wordId === undefined)
      throw new Error("At handleDeleteWord, wordId is undefined");
    try {
      const response = await deleteWordById(wordId);
      console.log("At handleDeleteWord the data is: ", response);
      navigate("/UserPage");
    } catch (error) {
      console.error("Error delete word:", error);
    }
  };

  const handleLogout = () => {
    Cookies.remove('user')
    navigate("/");    
  };

  return (
    <>
      <div className="container">
        <h1>Welcome {user}</h1>
        <button onClick={handleLogout}>LogOut</button>
        <p>Your Highest Score: {highScore}</p>
        <button onClick={() => setShowPopupAddWord(true)}>Add new Word</button>
        {showPopupAddWord && (
          <PopupAddWord onClose={() => setShowPopupAddWord(false)} />
        )}
        <button
          onClick={() => {
            navigate(`/playGame/:${wordList}`);
          }}
        >
          Play Now
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            setShow(!show);
            {!show ? setMassage("close session") : setMassage("Handle your words")}
            ;
          }}
        >
          {massage}
        </button>
        {show ? (
          <div>
            <h2>Here are all your DB words:</h2>
            <div className="list-container">
              {filterWordsList && wordList.length > 0
                ? filterWordsList.map((word) => {
                    return (
                      <div className="list-row" key={word.en_word}>
                        {word.en_word}, {word.he_word}
                        <button
                          className="btn-pencil-img"
                          onClick={() => setShowPopupUpdateWord(true)}
                        >
                          ✏️
                        </button>
                        {showPopupUpdateWord && (
                          <PopupUpdateWord
                            word={word}
                            onClose={() => setShowPopupUpdateWord(false)}
                          />
                        )}
                        <button
                          className="btn-garbageCan-img"
                          onClick={() => handleDeleteWord(word._id)}
                        >
                          🗑️
                        </button>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default UserPage;
