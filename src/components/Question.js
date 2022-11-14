import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {

  const [timeRemaining, setTimeRemaining] = useState(10);

  const timeLeft = () => {
    if(timeRemaining != 0) {
      setTimeRemaining(timeRemaining - 1);
    } else {
      console.log("nice");
    }
  }

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  useEffect(() => {
    const timerID = setInterval(() => {
      timeLeft();
      if(timeRemaining <= 0) {
        clearInterval(timerID)
        onAnswered();
      }
    }, 1000);

    // returning a cleanup function
    return function cleanup() {
      clearInterval(timerID);
    };
  }, [timeRemaining]);

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
