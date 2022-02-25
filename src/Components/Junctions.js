import data from "../Data/missingJunctions.json";
import JunctionCard from "./JunctionCard";
import { useState } from "react";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";

const listaFija = data;
console.log({data})

const Search = ({ filterList }) => {
  const [searched, setSearched] = useState("");

  const handleChange = (value) => {
    setSearched(value);
    filterList(searched);
  };

  return (
    <InputGroup>
      <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
      <Form.Control
        as="input"
        value={searched}
        onChange={(e) => handleChange(e.target.value)}
      ></Form.Control>
    </InputGroup>
  );
};

const Junctions = () => {
  const [junctions, setJunctions] = useState(listaFija);

  const criterias = {
    mostErrors: (a, b) => {
      return b.errors.length - a.errors.length;
    },
    circuito: (a, b) => {
      if (a.circuito < b.circuito) {
        return -1;
      }
      if (a.circuito > b.circuito) {
        return 1;
      }
      return 0;
    },
  };

  const filterList = (text) => {
    const copy = [...listaFija];
    const regex = new RegExp(text, "i");
    copy.forEach((elem) => {
      //if(elem.name.includes(text)) {
      if (elem.name.match(regex)) {
        elem.show = true;
      } else {
        elem.show = false;
      }
    });
    console.table(copy);
    setJunctions(copy);
  };

  const orderBy = (criteria) => {
    console.log(criterias[criteria])
    const copy = [...listaFija];
    const orderedList = copy.sort((a,b)=> criterias[criteria](a,b))
    console.table(orderedList)
    setJunctions(orderedList)
    //const orderedList = junctions.sort((a,b) => criterias[crieria](a,b))
    //const orderedList = junctions.sort((a, b) => criterias["circuito"](a, b));

    // console.table(orderedList);
    // setJunctions(orderedList);
    // console.log("AA");
    // console.log(document.querySelector("#order"));
  };

  return (
    <Container>
      <Row>
        <Col>
          <InputGroup>
            <InputGroup.Text id="basic-addon1">Order by</InputGroup.Text>
            <Form.Control
              as="select"
              id="order"
              aria-label="Order by"
              placeholder="Order by"
              onChange={(e) => orderBy(e.target.value)}
            >
              <option default value="circuito">Circuito</option>
              <option value="mostErrors">Most errors</option>
            </Form.Control>
          </InputGroup>
        </Col>
        <Col>
          <Search filterList={filterList} />
        </Col>
      </Row>
      <Row>
        <Col>
          {junctions.map((junction) =>
            junction.show ? <JunctionCard dataCard={junction} /> : <></>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Junctions;
