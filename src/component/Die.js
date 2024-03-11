function Die(props) {
  const styles = {
    backgroundColor: props.item.isHeld ? "#59E391" : "white",
  };
  return (
    <div
      className="die-face"
      style={styles}
      onClick={() => props.toggleHandle(props.item.id)}
    >
      <h2 className="die-number">{props.item.value}</h2>
    </div>
  );
}

export default Die;
