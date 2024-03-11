import React from "react";
import ReactDOM from "react-dom";
import Dice from "./component/Dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
function App() {
  let currentTime;
  let startTime;
  let elapsedTime = 0;
  let timeArray = [];
  const [dice, setDice] = React.useState(generateDice());
  const [gameOver, setGameOver] = React.useState(false);
  const [counter, setCounter] = React.useState(0);
  const [timer, setTimer] = React.useState(timeArray);
  /* this effects checks whether all dice are held and if all dice have the same value and makes the game to be over */
  React.useEffect(() => {
    // ckeck for all dice are held
    const allHeld = dice.every((held) => held.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((held) => held.value === firstValue);

    if (allHeld && allSameValue) {
      setGameOver(true);
    } else {
      setGameOver(false);
    }
  }, [dice]);
  // This function is initializing the dice object
  function generateDice() {
    startTime = new Date().getTime() - elapsedTime;
    const diceArray = [];
    for (let i = 0; i < 10; i++) {
      diceArray.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return diceArray;
  }
  /* this function is used to hold the dice whose number has to be matched */
  function holdDice(id) {
    setDice((prevState) =>
      prevState.map((item) => {
        return id === item.id ? { ...item, isHeld: !item.isHeld } : item;
      })
    );
  }
  /* this function is used to roll the dice but it rolls only the dice that has not been held and when the game is not over*/
  function rollDice() {
    currentTime = new Date().getTime() - startTime;

    if (!gameOver) {
      setCounter((prevState) => prevState + 1);
      setDice((oldState) =>
        oldState.map((item) => {
          return item.isHeld
            ? { ...item }
            : { ...item, value: Math.ceil(Math.random() * 6), id: nanoid() };
        })
      );
    } else {
      setDice(generateDice());
      setTimer(0);
    }
  }

  /* This block of code returns the Dice component to be rendered after every state changes*/
  const diceElement = dice.map((item) => (
    <Dice key={item.id} item={item} toggleHeld={holdDice} />
  ));
  const date = new Date().getFullYear();
  return (
    <main>
      {gameOver && <Confetti className="confetti" />}
      <h1 className="head">Lego Dice Roll</h1>
      <p className="instruction">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls
      </p>
      <div className="dice-container">{diceElement}</div>
      <button className="roll-btn" onClick={rollDice}>
        {gameOver ? "New Game" : "Roll"}
      </button>
      {gameOver && <p>You have Rolled {counter} times</p>}
      {/* {gameOver && <p>You have used {timer} ms</p>} */}
      <footer>&copy; {date} Developed by Legolas Technologies</footer>
    </main>
  );
}

export default App;

/** 
 * 1. creating componen called Dice to display 10 dice and then register
  *them by number 
 ->generating the random numbers that will display 10 dices andtheir faces each
  2. Dice Component wil receive the props from the App component to rendeer the dice value
  3. Triggering the state ot the dice component if clicked and checked


*/
