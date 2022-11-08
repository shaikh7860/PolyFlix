import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "./logo.png";
import "./App.css";
import SearchBar from "./SearchBar";

function NavBar(props) {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <a class="navbar-brand" href="/home">
          <div class="logo-image">
            <img src={logo} alt={""} class="img-fluid"></img>
          </div>
        </a>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <SearchBar handleSubmit={props.handleSubmit} />
          </Nav>
        </Navbar.Collapse>

        {/* <SearchBar handleSubmit={props.handleSubmit} /> */}
      </Container>
    </Navbar>
  );
}

export default NavBar;
