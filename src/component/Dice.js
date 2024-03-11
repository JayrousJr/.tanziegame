import React from "react";

function Dice(props) {
  const styles = {
    backgroundColor: props.item.isHeld ? "#597ee3" : "white",
    color: props.item.isHeld ? "white" : "#597ee3",
  };
  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < props.item.value; i++) {
      dots.push(<div key={i} className="dot dice-value"></div>);
    }
    return dots;
  };
  return (
    <div
      className="dice-face"
      style={styles}
      onClick={() => props.toggleHeld(props.item.id)}
    >
      {/* <div className="">{props.item.value}</div> */ renderDots()}
    </div>
  );
}

export default Dice;
