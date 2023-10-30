import {Stack} from "react-bootstrap";
import FormRegister from "../components/FormRegister/FormRegister";
import BaseScreen from "./BaseScreen";

export default function RegisterScreen() {
    return (
        <BaseScreen>
            <Stack className="mt-3">
                <h3>Register</h3>
                <FormRegister/>
            </Stack>
        </BaseScreen>
    )
}