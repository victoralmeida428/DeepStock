import {useEffect, useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../actions/userActions";
import Message from "./Message";
import { useNavigate } from "react-router-dom";

export default function LoginComponent() {
    const dispatch = useDispatch()
    const history = useNavigate()
    const loginReducer = useSelector(state => state.userLogin)
    const {error, userInfo} = loginReducer
    const [userlogin, setUserLogin] = useState('')
    const [pass, setPass] = useState('')
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(userlogin, pass))
    }
    useEffect(()=>{
        if (userInfo){
            history('/')
        }
    }, [dispatch, userInfo])

    return (
        <div className="m-5 w-5 text-center" >
            
            {
                error
                    ? <Message variant='danger'>{error}</Message>
                    : ''
            }
            <Container
                className="mt-4"
                style={{
                    width: '20vw'
                }}>

                <Form onSubmit={submitHandler}>
                    <Form.Label htmlFor="login">Login</Form.Label>
                    <Form.Control id="login" onChange={(e) => setUserLogin(e.target.value)}/>
                    <Form.Label className="mt-3" htmlFor="password">Password</Form.Label>
                    <Form.Control type="password" id="password" onChange={(e) => setPass(e.target.value)}/>
                    <Button
                        type="submit"
                        style={{
                            width: '100%'
                        }}
                        className="mt-3"
                        variant="info">Login</Button>
                </Form>
            </Container>
        </div>
    )

}