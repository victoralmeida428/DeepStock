import {Card, Col, Container, Image, Row, Stack} from "react-bootstrap";
import Header from "../components/Header/Header";
import LoginComponent from "../components/Login";
import Footer from "../components/Footer";
import {useSelector} from "react-redux";
import BaseScreen from "./BaseScreen";
import background from './backgrounhome.jpg'

export default function HomeScreen() {
    const loginReducer = useSelector(state => state.userLogin)
    const {userInfo} = loginReducer

    return (
        <BaseScreen>
            <Row className="mt-4">
                <Col md={4}>
                    <Stack direction="vertical">
                        <h3>
                            <a href="/stocks">Track your actions easely
                                <i
                                    class="ms-2 fa-solid fa-magnifying-glass-chart"
                                    style={{
                                        color: "#2c3e50"
                                    }}></i>
                            </a>
                        </h3>
                        <p>
                            Effortlessly monitor your investments and actions.
                        </p>
                    </Stack>
                </Col>
                <Col md={4}>
                    <Stack direction="vertical">
                        <a href="/stockspred">
                            <h3>Make predictions
                                <i
                                    class="ms-2 fa-solid fa-chart-line"
                                    style={{
                                        color: "#2c3e50"
                                    }}></i>
                            </h3>
                        </a>
                        <p>
                            Empower your decisions with data-driven predictions.
                        </p>
                    </Stack>

                </Col>
                <Col md={4}>
                    <Stack direction="vertical">
                        <a href="informations"><h3>Information at Your Fingertips</h3></a>
                        <p>
                            Access all the data you need to choose your assets wisely.
                        </p>
                    </Stack>
                </Col>
            </Row>
            <Row>
                <Image src={background} height={450}></Image>
            </Row>
        </BaseScreen>
    )
}