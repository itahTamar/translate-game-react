import React, { useState } from "react";
import { Word } from "../../types/words";
import { updateWordById } from "../../api/wordApi";

interface UpdateWordProps {
  word: Word;
  onSuccessfulUpdate: () => void;
}

const UpdateWord: React.FC<UpdateWordProps> = ({
  word,
  onSuccessfulUpdate,
}) => {
  const [enWord, setEnWord] = useState(word.en_word);
  const [heWord, setHeWord] = useState(word.he_word);

  const handleUpdateWord = async (ev: React.FormEvent<HTMLFormElement>) => {
    try {
      ev.preventDefault();
      const response = await updateWordById(word._id, enWord, heWord);
      if (!response)
        throw new Error("No response from axios at handleUpdateWord");
      window.alert("The update was successful");
      onSuccessfulUpdate();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleUpdateWord} className="form">
        <h2>Update your word</h2>
        <input
          type="text"
          value={enWord}
          onInput={(ev) => setEnWord((ev.target as HTMLInputElement).value)}
        ></input>
        <input
          type="text"
          value={heWord}
          onInput={(ev) => setHeWord((ev.target as HTMLInputElement).value)}
        ></input>
        <button type="submit">Update Now</button>
      </form>
    </div>
  );
};

export default UpdateWord;
