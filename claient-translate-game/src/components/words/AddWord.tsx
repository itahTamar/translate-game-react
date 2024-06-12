import { FC, useState } from "react";
import { addWord } from "./../../api/wordApi";

interface AddWordProps {
  refreshData: () => void;
}

//work ok
const AddWord: FC<AddWordProps> = ({ refreshData }) => {
  const [enWord, setEnWord] = useState("");
  const [heWord, setHeWord] = useState("");

  const handleAddWord = async (ev: React.FormEvent<HTMLFormElement>) => {
    try {
      ev.preventDefault();
      console.log("At handleAddWord the enWord & heWord are:", enWord, heWord);
      const response = await addWord(enWord, heWord);
      if (!response) {
        window.alert("Add word failed!");
        throw new Error("No response from axios at handleAddWord");
      }
      window.alert("The word added successful");
      // Reset the form fields by calling the form's reset method
      (ev.target as HTMLFormElement).reset();
      // Call the refreshData function passed as a prop
      refreshData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleAddWord} className="form">
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
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
};

export default AddWord;
