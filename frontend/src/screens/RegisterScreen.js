import {Stack} from "react-bootstrap";
import FormRegister from "../components/FormRegister/FormRegister";
import BaseScreen from "./BaseScreen";
import { useSelector } from "react-redux";
import FormConfirmation from "../components/FormRegister/FormConfirmation";
import { useState } from "react";

export default function RegisterScreen() {
    const code = useSelector(state => state.codeRegister)
    return (
        <BaseScreen>
            <Stack className="mt-3">
                <h3>Register</h3>
                {!code.data?<FormRegister/>:<FormConfirmation/>}
            </Stack>
        </BaseScreen>
    )
}