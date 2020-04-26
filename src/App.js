import React, { useState, useEffect } from 'react';
import List from './components/List';
import axios from 'axios';

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FALSHCARDS);

  useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=10').then((res) => {
      setFlashcards(
        res.data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer);
          const options = [
            ...questionItem.incorrect_answers.map((ans) => decodeString(ans)),
            answer,
          ];
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: questionItem.correct_answer,
            options: options.sort(() => Math.random() - 0.5),
          };
        })
      );
    });
  }, []);

  function decodeString(str) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
  }

  return (
    <div className="container">
      <List flashcards={flashcards} />
    </div>
  );
}

const SAMPLE_FALSHCARDS = [
  {
    id: 1,
    question: 'What is the meaning of life?',
    answer: '42',
    options: ['find love', 'money', '42', 'food'],
  },
  {
    id: 2,
    question: 'Is this real life',
    answer: 'it is just fantasy',
    options: ['it is just fantasy', 'yes', 'no', 'i am your father'],
  },
  {
    id: 3,
    question: 'Is trump stupid af?',
    answer: 'FUCK YES!',
    options: ['YES', 'FUCK YES!', 'yes', 'yeah'],
  },
];

export default App;
