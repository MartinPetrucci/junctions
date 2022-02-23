const Line = ({ line }) => {
  const styles = {
    linethrough: {
      textDecoration: "line-through",
    },
  };

  const lineStyle = (solved) => {
    return solved ? {...styles.linethrough, display: "inline"} : {display: "inline"}
  }

  const handleChange = (event) => {
    console.log(event.target.value);
  };
  return (
    <>
      <input value={line.id} type="checkbox" onChange={handleChange} />
      <p style={{ display: "inline" }}>{line.line}</p>
      <p style={lineStyle(line.solved)}>{line.content}</p>
      <br />
    </>
  );
};

export default Line;
