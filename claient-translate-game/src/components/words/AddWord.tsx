import { useNavigate } from "react-router-dom";
import { addWord } from "./../../api/users/wordApi";
import { useState } from "react";

const AddWord = () => {
  const [enWord, setEnWord] = useState("");
  const [heWord, setHeWord] = useState("");
  const navigate = useNavigate();

  const handleAddWord = async (ev: React.FormEvent<HTMLFormElement>) => {
    try {
      ev.preventDefault();
      console.log(
        "At handleAddWord the enWord & heWord are:",
        enWord,
        heWord
      );
      const response = await addWord(enWord, heWord);
      if (!response) {
        window.alert("Add word failed!");
        throw new Error("No response from axios at handleAddWord");
      }
      window.alert("The word added successful");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="login-container">
      <form onSubmit={handleAddWord} className="login-form">
        <h2>Add a new word</h2>
        <input
          type="text"
          placeholder="English Word"
          onInput={(ev) => setEnWord((ev.target as HTMLInputElement).value)}
        ></input>
        <input
          type="text"
          placeholder="Hebrew Word"
          onInput={(ev) => setHeWord((ev.target as HTMLInputElement).value)}
        ></input>
        <button type="submit">Add Now</button>
      </form>
    </div>
  );
};

export default AddWord;
