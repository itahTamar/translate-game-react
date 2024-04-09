import React, { useState } from "react";
import { Word } from "../../types/words";
import { updateWordById } from "../../api/users/wordApi";

interface PopupUpdateWordProps {
  onClose: () => void;
  word: Word;
}

const PopupUpdateWord: React.FC<PopupUpdateWordProps> = ({ word, onClose }) => {
  const [enWord, setEnWord] = useState(word.en_word)
  const [heWord, setHeWord] = useState(word.he_word)

  const handleUpdateWord = async (ev: React.FormEvent<HTMLFormElement>) => {
    try {
      ev.preventDefault();
      const response = await updateWordById(word._id, enWord, heWord)
      if(!response) throw new Error("No response from axios at handleUpdateWord");
      alert("The update was successful")
      onClose
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="popup">
      <button className="close" onClick={onClose}>X</button>
      <form onSubmit={handleUpdateWord} className="popup-inner">
        <h2>Update your word</h2>
        <input type="text" value={enWord} onInput={(ev) => setEnWord((ev.target as HTMLInputElement).value)}></input>
        <input type="text" value={heWord} onInput={(ev) => setHeWord((ev.target as HTMLInputElement).value)}></input>
        <button type="submit">Update Now</button>
      </form>
    </div>
  );
};

export default PopupUpdateWord;
