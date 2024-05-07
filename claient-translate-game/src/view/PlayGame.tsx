// need to add word cards component to render
// need to add a massage "popup" for correct/wrong answer

import { useContext, useEffect, useState } from "react";
import { getUserScores } from "../api/users/userApi";
// import { useParams } from "react-router-dom";
import WordCard from "../components/words/WordCard";
import { getRandomNineUserWordByUserId } from "../api/users/wordApi";
import { Word } from "../types/words";
import { UserContext } from "../context/userContext";

const PlayGame = () => {
  const [userName, setUserName] = useState("");
  const [score, setScore] = useState(0); //when the user chose the correct word the score increase with 1 point
  // const {wordList} = useParams() //get the all user word list that brute from server at userPage
  const [wordList, setWordList] = useState<Word[]>([])
  const [counter, setCounter] = useState(0)
  const [showMassage, setShowMassage] = useState("")
  const { user } = useContext(UserContext)

  const handleFinish = () => {
    //at end of the game the score will saved to user DB-scores
  };

   const LoadWords = async () => {
    try {
      const secondResponse = await getRandomNineUserWordByUserId()  //get array of 9 words
      if (!secondResponse) throw new Error("no user words from server");
      setWordList(secondResponse)
    } catch (error) {
      console.error("Error Load words:", error);
    } 
  }

  let random: number = Math.floor(Math.random()*3)
  const checkMatch = (numberOfWord: number) => {
    if (wordList[random]._id === wordList[numberOfWord]._id) {
      setShowMassage("Correct answer!")
      wordList.splice(random)
      setScore(counter+1)
    } else {
      setShowMassage("Wrong answer!")
    }
    setCounter(counter+1)
  }

  useEffect(() => {
    LoadWords()
  },[counter===9])

  // useEffect(()=>{
  //   let random: number = Math.floor(Math.random()*3)
  // },[])

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
              <WordCard word={wordList[random]} label="EN"/>
              <div className="cards_he">
                <button onClick={() => checkMatch(0)}><WordCard word={wordList[0]} label="HE" /></button>
                <button onClick={() => checkMatch(1)}><WordCard word={wordList[1]} label="HE" /></button>
                <button onClick={() => checkMatch(2)}><WordCard word={wordList[2]} label="HE" /></button>
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
