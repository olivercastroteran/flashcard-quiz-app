import React, { useState } from 'react';
import List from './components/List';

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FALSHCARDS);
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
