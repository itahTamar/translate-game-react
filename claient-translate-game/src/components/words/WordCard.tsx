import { Word } from "../../types/words"
import { FC, useState } from 'react';

// label - will give the indiction to show the he or the en word

interface WordProp {
  word: Word;
  label: string
}

const WordCard: FC<WordProp> = ({word, label}) => {

  return (
    <div>
    {word ? (
      <div>
        {label === "HE" ? word.he_word : word.en_word}
      </div>
    ) : (
      <div>Loading...</div>
    )}
  </div>
  )
}

export default WordCard
