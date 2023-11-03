import {Formik} from "formik";
import { useState } from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import * as yup from 'yup';
import { login, registerAccountAction } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";

export default function FormConfirmation(props) {
    const dispatch = useDispatch()
    const codeRegister = useSelector(state => state.codeRegister)
    const history = useNavigate()
    const [error, setError] = useState('')
    console.log(codeRegister)
    const schema = yup
        .object()
        .shape({
            code: yup
                .string()
                .required()
                .matches(/[A-Z]{3}-\d{4}/, 'Code Format Incorret')
        })
    const handleSubmit = (form) =>{
        if (form.code===codeRegister.data.code) {
            dispatch(registerAccountAction(codeRegister.data.username,
                codeRegister.data.name, codeRegister.data.email, codeRegister.data.password))
            setTimeout(()=>{
                dispatch(login(codeRegister.data.username, codeRegister.data.passwor))
                history('/')
            }, 800)
            
            
            
        }

    }

    return (
        <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
            code:''
            }}>
            {
                ({handleSubmit, handleChange, values, touched, errors}) => (
                    <Form onSubmit={handleSubmit} noValidate>
                        <Row>
                            <Col md={3}>
                                <Form.Label>
                                    Code Verify
                                </Form.Label>
                                <Form.Control
                                name="code" 
                                onChange={handleChange} 
                                value={values.code}/>
                                {errors.code?<p style={{color:'red', fontSize:'1.1rem'}} className='mt-2 mb-2'>*{errors.code}</p>:null}
                            </Col>
                        </Row>

                        <Button className="mt-3" type='submit' variant="secondary">Validate</Button>
                    </Form>
                )
            }
        </Formik>
    )
}