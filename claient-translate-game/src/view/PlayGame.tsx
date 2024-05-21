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
  const [showMassage, setShowMassage] = useState("");
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
      setShowMassage("Correct answer!");
      wordList.splice(random, 1);
      console.log("at PlayGame/checkMatch the wordList:", wordList);
      setScore(score + 1);
    } else {
      setShowMassage("Wrong answer!");
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

  return (
    <>
      <div className="game">
        <div className="wrapper">
          <h1 className="username">Hello {user}</h1>
          <h4 className="instruction">Match the word to its meaning</h4>
          <p>your score: {score}</p>
          <div className="wrapper">
            <div className="massage">{showMassage}</div>
            <div className="cards" id="cards">
              <WordCard word={wordList[random]} label="EN" />
              <div className="cards_he">
                <button onClick={() => checkMatch(0)}>
                  <WordCard word={wordList[0]} label="HE" />
                </button>
                <button onClick={() => checkMatch(1)}>
                  <WordCard word={wordList[1]} label="HE" />
                </button>
                <button onClick={() => checkMatch(2)}>
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
