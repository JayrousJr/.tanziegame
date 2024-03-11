import React from "react";
import Die from "./component/Die";
import { nanoid } from "nanoid";
// import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
function App() {
  // const { width, height } = useWindowSize();
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  // initializing the game with a an object array
  function allNewDice() {
    let newArray = [];
    for (let i = 0; i < 10; i++) {
      newArray.push({
        value: Math.ceil(Math.random() * 6),
        id: nanoid(),
        isHeld: false,
      });
    }
    return newArray;
  }
  //ending the game
  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);
  //holding the value that you want to keep constatnt
  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((item) => {
        return id === item.id ? { ...item, isHeld: !item.isHeld } : item;
      })
    );
  }
  // rolling the dice by re randomize hte number, but this function only renders the only un held data
  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((item) => {
          return {
            ...item,
            value: item.isHeld ? item.value : Math.ceil(Math.random() * 6),
            id: item.isHeld ? item.id : nanoid(),
          };
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  // rendering the Die omponent
  const diceElement = dice.map((item) => (
    <Die key={item.id} item={item} toggleHandle={holdDice} />
  ));
  const date = new Date().getFullYear();
  // Return
  return (
    <main>
      <h1 className="title">Roll Dice</h1>
      <p className="instruction">
        Roll until all dice are the same. Click each die to frieze it at its
        current value between rolls
      </p>
      <div className="dice--container">
        {tenzies && <Confetti />}
        {diceElement}
      </div>
      <button className="roll-btn" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      <footer>&copy; {date} Legolas Game Center</footer>
    </main>
  );
}

export default App;
