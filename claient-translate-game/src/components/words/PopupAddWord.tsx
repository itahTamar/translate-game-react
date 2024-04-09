import React, { useState } from "react";
import { addWord } from "../../api/users/wordApi";

interface PopupAddWordProps {
  onClose: () => void;
}

const PopupAddWord: React.FC<PopupAddWordProps> = ({ onClose }) => {
  const [enWord, setEnWord] = useState("")
  const [heWord, setHeWord] = useState("")

  const handleAddWord = async (ev: React.FormEvent<HTMLFormElement>) => {
    try {
      ev.preventDefault();
      const response = await addWord(enWord, heWord)
      if(!response) throw new Error("No response from axios at handleAddWord");
      alert("The word added successful")
      onClose
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="popup">
      <button className="close" onClick={onClose}>X</button>
      <form onSubmit={handleAddWord} className="popup-inner">
        <h2>Add a knew word</h2>
        <input type="text" placeholder="English Word" onInput={(ev) => setEnWord((ev.target as HTMLInputElement).value)}></input>
        <input type="text" placeholder="Hebrew Word" onInput={(ev) => setHeWord((ev.target as HTMLInputElement).value)}></input>
        <button type="submit">Add Now</button>
      </form>
    </div>
  );
};

export default PopupAddWord;
