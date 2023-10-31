import { Col, Container, Row } from "react-bootstrap";

export default function Footer(props) {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center">Copyright &copy; DeepStock</Col>
                </Row>
            </Container>
        </footer>
    )

}