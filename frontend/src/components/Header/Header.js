import {Container, Nav, NavDropdown, Navbar} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import './Header.css'

export default function Header(props) {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <header>
            <Navbar expand="lg" className="bg-primary" variant="dark">
                <Container>
                    <Navbar.Brand href="/">DeepStock</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-3">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/stocks">Stocks</Nav.Link>
                            <NavDropdown title="Products" id="basic-nav-dropdown">
                                <NavDropdown.Item href="stockspred">Predic's Stocks</NavDropdown.Item>
                                {/* <NavDropdown.Item href="#action/3.2">Satistical</NavDropdown.Item> */}
                                <NavDropdown.Item href="informations">Informations</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav className="ms-auto">
                            {userInfo?<Nav.Link href="/" onClick={logoutHandler}>Logout</Nav.Link>:<Nav.Link style={{fontWeight:'bold'}} href="/login">Login</Nav.Link>}
                            {userInfo?'':<Nav.Link className="clientRegister" href="register">Become a client !</Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </header>
    )

}