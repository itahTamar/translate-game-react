import { useEffect, useState } from "react";
import { Word } from "../types/words";
import { deleteUserWordById, getAllUserWord } from "./../api/wordApi";
// import UpdateWord from "./../components/words/UpdateWord";
import { useNavigate } from "react-router-dom";
// import Popup from "../components/popup";
import { Table } from "../components/Table";
import type { ColumnDef } from '@tanstack/react-table';

const Settings = () => {
  const [wordList, setWordList] = useState<Word[]>([]);
//   const [filterWordsList, setFilterWordsList] = useState<Word[]>([]);
//   const [showPopupUpdateWord, setShowPopupUpdateWord] = useState(false);
  const navigate = useNavigate();

  const columns: ColumnDef<Word>[] = [  //change to get all fields from db 
    {
        header: 'English Word',
        accessorKey: 'en_word',
    },
    {
        header: 'Hebrew Word',
        accessorKey: 'he_word'
    }
]

//   const handleSuccessfulUpdate = () => {
//     setShowPopupUpdateWord(false);
//   }; //work ok

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
        <Table<Word> data={wordList} columns={columns}/>
        {/* <div className="list-container">
          {filterWordsList && wordList.length > 0
            ? filterWordsList.map((word) => {
                return (
                  <div className="list-row" key={word.en_word}>
                    {word.en_word}, {word.he_word}
                    <button
                      className="btn-pencil-img"
                      onClick={() => setShowPopupUpdateWord(true)}
                    >
                      ✏️
                    </button>
                    {showPopupUpdateWord && (
                      <Popup onClose={() => setShowPopupUpdateWord(false)}>
                        <UpdateWord
                          word={word}
                          onSuccessfulUpdate={handleSuccessfulUpdate}
                        />
                      </Popup>
                    )}
                    <button
                      className="btn-garbageCan-img"
                      onClick={() => handleDeleteWord(word._id)}
                    >
                      🗑️
                    </button>
                  </div>
                );
              })
            : null}
        </div> */}
      </div>
    </div>
  );
};

export default Settings;
