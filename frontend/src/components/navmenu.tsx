import '../assets/navmenu.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { List } from 'react-bootstrap-icons';


function NavMenu() {
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <nav className="navbar sticky-top navbar-light bg-light">
      <div className="container-fluid">
      <h1 className="navbarHeadTitle">
        <Link to="/" className="navbarHeadLink">M.R GRIND</Link>
      </h1>
      <Button variant="primary" onClick={handleShow} className="d-block dropdown-button">
        <List />
      </Button>
        <Offcanvas show={show} onHide={handleClose} placement="end">
          <Offcanvas.Body>
          <nav className="navbar-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </nav>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </nav>
  );
}

export default NavMenu;
