import { useEffect, useState } from "react";
import { Word } from "../types/words";
import { deleteUserWordById, getAllUserWord } from "./../api/wordApi";
// import UpdateWord from "./../components/words/UpdateWord";
import { useNavigate } from "react-router-dom";
// import Popup from "../components/popup";
import { TableLocal } from "../components/TableLocal";
import type { ColumnDef } from '@tanstack/react-table';

const Settings = () => {
  const [wordList, setWordList] = useState<Word[]>([]);
  const navigate = useNavigate();

  const handleGetAllUserWords = async () => {
    try {
      const response = await getAllUserWord();
      console.log("at settings/handleGetAllUserWords the response:", response)
      if (!response)
        throw new Error(
          "No response from axios getAllUserWord at handleGetAllUserWords"
        );
      setWordList(response);
    //   setFilterWordsList(response);
    } catch (error) {
      console.error(error);
    }
  }; //work ok

//   const handleDeleteWord = async (wordId: string) => {
//     if (wordId === undefined)
//       throw new Error("At handleDeleteWord, wordId is undefined");
//     try {
//       const response = await deleteUserWordById(wordId);
//       console.log("At handleDeleteWord the data is: ", response);
//       const { ok, massage } = response;
//       if (ok) {
//         setShowMassage(true);
//         setHandleWordMassage(massage);
//         handleGetAllUserWords();
//         setTimeout(() => {
//           setShowMassage(false);
//         }, 3000);
//       }
//       navigate("/UserPage");
//     } catch (error) {
//       console.error("Error delete word:", error);
//     }
//   }; //work ok

  useEffect(() => {
    handleGetAllUserWords();
  }, []);

  return (
    <div>
      <div>
        <button className="back" onClick={() => navigate(-1)}>Back</button>
        <h2>Your words:</h2>
        <TableLocal<Word> dataOriginal={wordList}/>
      </div>
    </div>
  );
};

export default Settings;
