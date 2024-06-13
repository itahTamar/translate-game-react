// need to add word cards component to render
// need to add a massage "popup" for correct/wrong answer

import { useContext, useEffect, useState } from "react";
import WordCard from "../components/words/WordCard";
import { UserContext } from "../context/userContext";
import { Word } from "../types/words";
import { getXRandomUserWordByUserId } from "../api/wordApi";
import { useNavigate } from 'react-router-dom';

const PlayGame = () => {
  const [score, setScore] = useState(0); //when the user chose the correct word the score increase with 1 point
  const [wordList, setWordList] = useState<Word[]>([]);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate('/userPage')
    //at end of the game the score will saved to user DB-scores
  };

  function shuffle(array: Word[]) {
    // Create a copy of the original array
    const shuffledArray = [...array];
  
    // Fisher-Yates shuffle algorithm
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
  
    return shuffledArray;
  }
  
  const LoadWords = async () => {
    try {
      const response = await getXRandomUserWordByUserId(); //get array of X words
      console.log("at PlayGame/LoadWord the response:", response);
      if (!response) throw new Error("no user words from server");
      setWordList(response);
    } catch (error) {
      console.error("Error Load words:", error);
    }
  };

  let random: number = Math.floor(Math.random() * 3);
  console.log("at PlayGame/checkMatch the random:", random);

  const checkMatch = (numberOfWord: number) => {
    console.log("at PlayGame/checkMatch the random:", random);
    console.log("at PlayGame/checkMatch the wordList:", wordList);

    if (wordList[random]._id === wordList[numberOfWord]._id) {
      setMessage("Correct answer!");
      displayMessage()
      wordList.splice(random, 1);
      console.log("at PlayGame/checkMatch the wordList:", wordList);
      setScore(score + 1);
    } else {
      setMessage("Wrong answer!");
      displayMessage()
      const shuffledArray = shuffle(wordList); 
      console.log("at PlayGame/checkMatch the shuffledArray:", shuffledArray);
      setWordList(shuffledArray) 
    }

    if (wordList.length < 3) {
      LoadWords();
    }
  };

  useEffect(() => {
    LoadWords();
  }, []);

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 1000);
      return () => clearTimeout(timer); // Clean up the timer on component unmount
    }
  }, [showMessage]);

  const displayMessage = () => {
    setShowMessage(true);
  };

  return (
    <>
      <div className="game h-screen">
      <h1 className="username relative top-16">Hello {user}</h1>
      <div className="wrapper relative mt-24">
          <h4 className="instruction">Match the word to its meaning</h4>
          <p className="pt-4">your score: {score}</p>
          <div className="second-wrapper mt-20">
            {showMessage && <div className="massage pb-2">{message}</div>}
            <div className="cards" id="cards">
              <span className="text-3xl"><WordCard word={wordList[random]} label="EN" /></span>
              <div className="cards_he mt-3">
                <button className="m-4 text-xl" onClick={() => checkMatch(0)}>
                  <WordCard word={wordList[0]} label="HE" />
                </button>
                <button className="m-4 text-xl" onClick={() => checkMatch(1)}>
                  <WordCard word={wordList[1]} label="HE" />
                </button>
                <button className="m-4 text-xl" onClick={() => checkMatch(2)}>
                  <WordCard word={wordList[2]} label="HE" />
                </button>
              </div>
            </div>
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
