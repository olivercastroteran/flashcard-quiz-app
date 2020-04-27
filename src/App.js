import React, { useState, useEffect, useRef } from 'react';
import List from './components/List';
import axios from 'axios';

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FALSHCARDS);
  const [categories, setCategories] = useState([]);
  const categoryEl = useRef();
  const amountEl = useRef();

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php').then((res) => {
      setCategories(res.data.trivia_categories);
    });
  }, []);

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

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="anoubt">Number of Questions</label>
          <input
            type="number"
            id="amount"
            min="1"
            step="1"
            defaultValue={10}
            ref={amountEl}
          />
        </div>
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
      </form>
      <div className="container">
        <List flashcards={flashcards} />
      </div>
    </>
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
