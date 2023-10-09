import {Container, Nav, NavDropdown, Navbar} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

export default function Header(props) {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <header>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">Fincare</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-3">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="#link">About</Nav.Link>
                            <Nav.Link href="/stocks">Stocks</Nav.Link>
                            <NavDropdown title="Products" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Predic's Stocks</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Satistical</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Informations</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav className="ms-auto">
                            {userInfo?<Nav.Link href="/" onClick={logoutHandler}>Logout</Nav.Link>:<Nav.Link href="/login">Login</Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </header>
    )

}