// 1) render a list of all user words, with the option to update or delete a word (like in the books project),  
// 2) Add a new word form, 3) render the user highest score, 
// 4) Start paly button, 
// 5) Log-out button will move the user back to landing page

import { useEffect, useState } from "react"
import { Word } from "../types/words"
import { useNavigate } from "react-router-dom"
import { getAllUserWord } from "../api/users/wordApi"

const UserPage = () => {
    const [wordList, setWordList] = useState<Word[]>([])
    const [filterWordsList, setFilterWordsList] = useState<Word[]>([])
    const navigate = useNavigate()

    const handleGetAllUserWords = async () => {
        try {
           const response = await getAllUserWord() 
           if (!response) throw new Error("No response from axios getAllUserWord at handleGetAllUserWords");
           setWordList(response)
           setFilterWordsList(response)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        handleGetAllUserWords()
    },[])

    const handleUpdate = () => {

    }

    const handleDelete = () => {

    }

  return (
    <div>
      <h2>Here are all your DB words:</h2>
      <div className="list-container">
        {filterWordsList && wordList.length>0 ?
    (filterWordsList.map((word) => {
        return (
            <div className="list-row" key={word.en_word}>
                {word.en_word}, {word.he_word}
                <button className='btn-pencil-img' onClick={() => handleUpdate()}>✏️</button>
                <button className='btn-garbageCan-img' onClick={() => handleDelete()}>🗑️</button>
            </div>
        )
    })) : null
    }
      </div>
    </div>
  )
}

export default UserPage
