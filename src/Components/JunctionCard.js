import { Col, Container, Row } from "react-bootstrap";
import Line from "./Line";

const JunctionCard = ({ dataCard }) => {
  const styles = {
    card: {
      backgroundColor: "#1973B8",
      color: "white",
      marginTop: "5px",
      paddingLeft: "10px",
      paddingRight: "10px",
      paddingBottom: "10px"
    },
    title: {
      fontSize: "29px",
      display: "inline",
      align: "center",
      color: "white"
    },
    circuito: {
      backgroundColor: "white",
      color: "black",
      width: "100%",
      borderRadius: "4px",
      marginTop: "12px"
    },
    checkbox: {
      display: "inline",
      margin: "5px",
      width: "16px",
      height: "16px",
    },
  };

  const renderList = (list, title) => {
    if (list.length > 0) {
      return (
        <Container>
          <Row>
            <Col>
              <p style={{ fontSize: "25px", margin: "4px 0 2px 0" }}>{title}</p>
            </Col>
          </Row>
          {list.map((elem) => {
            return (
              <Row>
                <Col>
                  <Line line={elem} />
                </Col>
              </Row>
            );
          })}
        </Container>
      );
    }
    return <></>;
  };

  const handleChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <Container style={styles.card}>
      <Row>
        <Col xs="8">
          {/* <p style={styles.title}> {dataCard.name}.js</p> */}
          <a target="_blank" href={dataCard.path} style={styles.title}> {dataCard.name}.js</a>
          <input
            style={styles.checkbox}
            type="checkbox"
            value={dataCard.name}
            onChange={handleChange}
          />
        </Col>
        <Col xs="4">
          <div style={styles.circuito}>
            <p style={{ textAlign: "center", fontWeight: "600" }}>{dataCard.circuito}</p>
          </div>
        </Col>
      </Row>
      {renderList(dataCard.errors, "Lines with missing junctions")}
      {renderList(dataCard.variables, "Variables declaration")}
    </Container>
  );
};

export default JunctionCard;
