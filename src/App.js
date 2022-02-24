import { Container, Navbar } from "react-bootstrap";
import Junctions from "./Components/Junctions";

function App() {
  return (
    <div className="App">
      <Navbar style={{backgroundColor: "#072146", marginBottom: "30px"}}>
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://www.bbva.com.ar/content/dam/public-web/global/images/logos/logo_bbva_blanco.svg"
              width="180"
              height="100"
              className="d-inline-block align-top"
            />{" "}
          </Navbar.Brand>
        </Container>
      </Navbar>
      {/* <p style={{fontSize: "62px", margin:"40px", textAlign: "center" }}>Missing junctions</p> */}
      <Junctions />
    </div>
  );
}

export default App;
