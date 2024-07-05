import { FC } from 'react';
import "../../style/wordCard.css";
import { Word } from "../../types/words";

// label - will give the indiction to show the he or the en word
//To give different styles to the .card when it shows word.en_word or word.he_word, 
//you can apply conditional class names based on the label prop.

interface WordProp {
  word: Word;
  label: string
}

const WordCard: FC<WordProp> = ({word, label}) => {

  return (
    <div>
    {word ? (
      <div className={`card ${label === "HE" ? 'he-card' : 'en-card'}`}>  
        {label === "HE" ? word.he_word : word.en_word}
      </div>
    ) : (
      <div>Loading...</div>
    )}
  </div>
  )
}

export default WordCard
