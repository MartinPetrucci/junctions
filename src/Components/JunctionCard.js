import { Col, Container, Row } from "react-bootstrap";
import Line from "./Line";

const JunctionCard = ({ dataCard }) => {
  const styles = {
    card: {
      backgroundColor: "#1973B8",
      color: "white",
      marginTop: "5px",
      marginBottom: "5px",

      padding: "5px",
    },
    title: {
      fontSize: "29px",
      display: "inline",
      align: "center",
    },
    circuito: {
      backgroundColor: "white",
      color: "black",
      width: "55%",
      borderRadius: "4px",
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
        <Col xs="4">
          <div style={styles.circuito}>
            <p style={{ textAlign: "center" }}>{dataCard.circuito}</p>
          </div>
        </Col>
        <Col xs="8">
          <p style={styles.title}> {dataCard.name}.js</p>
          <input
            style={styles.checkbox}
            type="checkbox"
            value={dataCard.name}
            onChange={handleChange}
          />
        </Col>
      </Row>
      {renderList(dataCard.errors, "Lines with missing junctions")}
      {renderList(dataCard.variables, "Variables declaration")}
    </Container>
  );
};

export default JunctionCard;
