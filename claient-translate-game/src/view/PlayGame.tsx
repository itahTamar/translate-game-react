// need to add word cards component to render
// need to add a massage "popup" for correct/wrong answer

import { useContext, useEffect, useState } from "react";
import WordCard from "../components/words/WordCard";
import { UserContext } from "../context/userContext";
import { Word } from "../types/words";
import { getXRandomUserWordByUserId } from "../api/wordApi";
import { useNavigate } from 'react-router-dom';
import "../style/game.css"
        
const PlayGame = () => {
  const [score, setScore] = useState(0); //when the user chose the correct word the score increase with 1 point
  const [wordList, setWordList] = useState<Word[]>([]);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false)
  const [random, setRandom] = useState(Math.floor(Math.random() * 3))
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate('/userPage')
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
    setLoading(true)
    try {
      const response = await getXRandomUserWordByUserId(); //get array of X words
      console.log("at PlayGame/LoadWord the response:", response);
      if (!response) throw new Error("no user words from server");
      setWordList(response);
    } catch (error) {
      console.error("Error Load words:", error);
    } 
  };

  // let random: number = Math.floor(Math.random() * 3);
  // console.log("at PlayGame/checkMatch the random:", random);

  const checkMatch = (numberOfWord: number) => {
    console.log("at PlayGame/checkMatch the random:", random);
    console.log("at PlayGame/checkMatch the wordList:", wordList);
    console.log("at PlayGame/checkMatch the wordList[random]:", wordList[random]);

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
    setRandom(Math.floor(Math.random() * 3))
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
      }, 1500);
      return () => clearTimeout(timer); // Clean up the timer on component unmount
    }
  }, [showMessage]);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000);
      return () => clearTimeout(timer); // Clean up the timer on component unmount
    }
  }, [loading])

  const displayMessage = () => {
    setShowMessage(true);
  };

  return (
    <>
      <div className="game h-screen w-screen">
      <button className="back" onClick={handleFinish}>Finish</button>
      <h1 className="username relative top-2 text-white">Hello {user}</h1>
      <div className="wrapper relative mt-12">
          <h4 className="instruction text-white">Match the word to its meaning</h4>
          <p className="pt-4 text-white">your score: {score}</p>
          <div className="absolute inset-x-1/4">
          {showMessage && <div className={`massage ${message === "Correct answer!" ? 'correct' : 'wrong'}`}>{message}</div> }
          </div>
          {loading ? (
            <div className="text-amber-500 text-3xl">Good Job, carry on..</div> 
          ) : (
          <div className="second-wrapper mt-20">
            <div>
              <span className="text-3xl inline-block">
                <WordCard word={wordList[random]} label="EN" />
              </span>
              <div className="mt-3">
                <button className="m-8 p-0 border-0 rounded-2xl" onClick={() => checkMatch(0)}>
                  <WordCard word={wordList[0]} label="HE" />
                </button>
                <button className="m-8 p-0 border-0 rounded-2xl" onClick={() => checkMatch(1)}>
                  <WordCard word={wordList[1]} label="HE" />
                </button>
                <button className="m-8 p-0 border-0 rounded-2xl" onClick={() => checkMatch(2)}>
                  <WordCard word={wordList[2]} label="HE" />
                </button>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PlayGame;
