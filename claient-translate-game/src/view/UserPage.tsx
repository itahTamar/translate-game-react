// 1) render a list of all user words, with the option to update or delete a word (like in the books project) ->done
// 2) Add a new word form in popup -> done
// 3) render the user highest score -> done
// 4) Start paly button -> done
// 5) Log-out button will move the user back to landing page and delete the data from cookie -> done
// 6) make the render-word a lazy-load

import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUserWord } from "../api/users/wordApi";
import { UserContext } from "../context/userContext";
import { Word } from "../types/words";
import { getUserHighScore } from "./../api/users/userApi";
import { deleteUserWordById } from './../api/users/wordApi';
import Popup from "./../components/popup";
import AddWord from "./../components/words/AddWord";
import UpdateWord from "./../components/words/UpdateWord";

const UserPage = () => {
  const [wordList, setWordList] = useState<Word[]>([]);
  const [filterWordsList, setFilterWordsList] = useState<Word[]>([]);
  const [showPopupUpdateWord, setShowPopupUpdateWord] = useState(false);
  const [showPopupAddWord, setShowPopupAddWord] = useState(false);
  const [showMassage, setShowMassage] = useState(false)
  const [highScore, setHighScore] = useState<number>();
  const [show, setShow] = useState(false);
  const [massage, setMassage] = useState("Handle your words");
  const [handleWordMassage, setHandleWordMassage] = useState<string>("")
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
      console.log("at load userPage the wordList is:", wordList);
      const response: number = await getUserHighScore();
      console.log("at userPage/handleGetAllUserWords the response:", response);
      if (!response && response != 0)
        throw new Error(
          "No response from axios getHighestUserScores at handleGetUserHighScore"
        );
      setHighScore(response);
      console.log(
        "at userPage/handleGetAllUserWords the highScore:",
        highScore
      );
    } catch (error) {
      console.error(error, "at handleGetUserHighScore got a catch");
    }
  }; //work ok

  useEffect(() => {
    handleGetUserHighScore();
  }, []);

  useEffect(() => {
    handleGetAllUserWords();
  }, [show, showPopupUpdateWord]);

  const handleDeleteWord = async (wordId: string) => {
    if (wordId === undefined)
      throw new Error("At handleDeleteWord, wordId is undefined");
    try {
      const response = await deleteUserWordById(wordId);
      console.log("At handleDeleteWord the data is: ", response);
      const {ok, massage} = response
      if(ok){
        setShowMassage(true)
        setHandleWordMassage(massage)
        handleGetAllUserWords()
        setTimeout(() => {
          setShowMassage(false);
        }, 3000);
      } 
      navigate("/UserPage");
    } catch (error) {
      console.error("Error delete word:", error);
    }
  }; //work ok

  const handleLogout = () => {
    Cookies.remove("user");
    navigate("/");
  };

  const handleSuccessfulUpdate = () => {
    setShowPopupUpdateWord(false); 
  }; //work ok

  return (
    <>
      <div className="container">
        <h1>Welcome {user}</h1>
        <button onClick={handleLogout}>LogOut</button>
        <p>Your Highest Score: {highScore}</p>
        <button onClick={() => setShowPopupAddWord(true)}>Add new Word</button>
        {showPopupAddWord && (
          <Popup onClose={() => setShowPopupAddWord(false)}>
            <AddWord />
          </Popup>
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
            {
              !show
                ? setMassage("close session")
                : setMassage("Handle your words");
            }
          }}
        >
          {massage}
        </button>
        {show ? (
          <div>
            <h2>Here are all your words:</h2>
            {showMassage ? <h4>{handleWordMassage}</h4> : null}
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
                          <Popup onClose={() => setShowPopupUpdateWord(false)}>
                            <UpdateWord word={word} onSuccessfulUpdate={handleSuccessfulUpdate}/>
                          </Popup>
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
