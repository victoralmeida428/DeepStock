import {Container} from "react-bootstrap";
import Header from "../components/Header";
import LoginComponent from "../components/Login";
import Footer from "../components/Footer";
import {useSelector} from "react-redux";
import BaseScreen from "./BaseScreen";

export default function HomeScreen() {
    const loginReducer = useSelector(state => state.userLogin)
    const {userInfo} = loginReducer

    return (
        <BaseScreen>
        Wellcome {userInfo?userInfo.username:''}
        </BaseScreen>
    )
}