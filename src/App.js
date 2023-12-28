import React, { useState, useEffect } from "react";
import "./App.css";
import "./Dark.css"

function App() {
  const [userChoice, setUserChoice] = useState("rock");
  const [computerChoice, setComputerChoice] = useState("rock");
  const [userPoints, setUserPoints] = useState(0);
  const [computerPoints, setComputerPoints] = useState(0);
  const [turnResult, setTurnResult] = useState(null);
  const [result, setResult] = useState("lets see who wins");
  const [gameOver, setGameOver] = useState(false);
  const choices = ["Rock", "Paper", "Scissors"];
  const handleOnClick = (choice) => {
    setUserChoice(choice);
    generateComputerChoice();
  };

  const generateComputerChoice = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
  };

  const reset = () => {
    window.location.reload();
  };
  const [darkMode, setDarkMode] = React.useState(false);

  useEffect(() => {
    const body = document.body;
    const toggle = document.querySelector(".toggle-inner");

    // If dark mode is enabled - adds classes to update dark-mode styling.
    // Else, removes and styling is as normal.
    if (darkMode === true) {
      body.classList.add("dark-mode");
      toggle.classList.add("toggle-active");
    } else {
      body.classList.remove("dark-mode");
      toggle.classList.remove("toggle-active");
    }
  }, [darkMode]);
  useEffect(() => {
    const comboMoves = userChoice + computerChoice;
    if (userPoints <= 4 && computerPoints <= 4) {
      if (
        comboMoves === "RockScissors" ||
        comboMoves === "PaperRock" ||
        comboMoves === "ScissorsPaper"
      ) {
        const updatedUserpoints = userPoints + 1;
        setUserPoints(updatedUserpoints);
        setTurnResult("You Won");
        if (updatedUserpoints === 5) {
          setGameOver(true);
          setResult("User Wins");
        }
      }
    }
    if (
      comboMoves === "ScissorsRock" ||
      comboMoves === "RockPaper" ||
      comboMoves === "PaperScissors"
    ) {
      const updatedComputerPoints = computerPoints + 1;
      setComputerPoints(updatedComputerPoints);
      setTurnResult("Computer Won");
      if (updatedComputerPoints === 5) {
        setGameOver(true);
        setResult("Computer Wins");
      }
    }
    if (
      comboMoves === "RockRock" ||
      comboMoves === "PaperPaper" ||
      comboMoves === "ScissorsScissors"
    ) {
      setTurnResult("Its a Tie");
    }
  }, [userChoice, computerChoice]);
  return (
    <div className="bg">
      <div className="App">
        <div className="head">
          <h1 className="heading">Rock Paper Scissors</h1>
          <div
            id="toggle"
            onClick={() =>
              darkMode === false ? setDarkMode(true) : setDarkMode(false)
            }
          >
            <div className="toggle-inner" />
          </div>
        </div>
        <div className="score">
          <h1>User Points: {userPoints} </h1>
          <h1>Computer Points: {computerPoints}</h1>
        </div>
        <div className="choices">
          <div className="choice-user">
            <img
              src={`../images/${userChoice}.png`}
              alt=""
              className="user-hand"
            />
          </div>
          <div className="choice-computer">
            <img
              src={`../images/${computerChoice}.png`}
              alt=""
              className="computer-hand"
            />
          </div>
        </div>
        <div children="button-div">
          {choices.map((choice, index) => (
            <button
              className="button"
              key={index}
              onClick={() => handleOnClick(choice)}
            >
              {choice}
            </button>
          ))}
        </div>

        <div className="result">
          <h1>Turn Result: {turnResult}</h1>
          <h1>Final Result: {result}</h1>
        </div>

        <div className="button-div">
          {gameOver && (
            <button onClick={() => reset()} className="button2">
              Play Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
