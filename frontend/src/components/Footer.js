import { Col, Container, Row } from "react-bootstrap";

export default function Footer(props) {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center">Copyrigth &copy; FinCare</Col>
                </Row>
            </Container>
        </footer>
    )

}