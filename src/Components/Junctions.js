import junctions from "../Data/missingJunctions.json";
import JunctionCard from "./JunctionCard";

const Junctions = () => {
  //console.table(junctions)
  console.table(junctions[0]);

  return (
    <>
      {junctions.map(junction => <JunctionCard dataCard={junction} />)}
    </>
  );
};

export default Junctions;
