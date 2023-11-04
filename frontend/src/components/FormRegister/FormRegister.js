import { Alert, Button, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import './FormRegister.css'
import { useDispatch, useSelector } from 'react-redux';
import { codeAccountAction, login, registerAccountAction, verifierAccountAction } from '../../actions/userActions';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

export default function FormRegister(props) {
    const dispatch = useDispatch()
    const verifier = useSelector(state => state.userVerifier)
    const codeRegister = useSelector(state => state.codeRegister)
    const history = useNavigate()
    const [error, setError] = useState('')
    const [send, setSend] = useState('')

    useEffect(()=>{
        dispatch(verifierAccountAction())
    }, dispatch)

    const { Formik } = formik;
    const schema = yup.object().shape({
        name: yup.string().required('Name is required'),
        email: yup.string().required('E-mail is required').email('E-mail must be a valid'),
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is require')
                    .min(6, 'Min 6 digits')
                    .test('passwords-match', 'Passwords do not match', function (value) {
            return value === this.parent.confirm; // Verifica se o campo "confirm" é igual ao campo "password"
          }).test('pass-carac', 'Minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character',
          (value)=>{
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
            return regex.test(value)
          }),
        confirm: yup.string().required(''),
      });
      const handlerSubmit = (form)=>{
        
            if (verifier.error){
                setError(verifier.error)
            }
            else if (verifier.data ){
                const emails = verifier.data.map((e)=>e.email)
                const users = verifier.data.map((e)=>e.username)
                console.log(!emails.includes(form.email) && !users.includes(form.username))
                console.log(emails.includes(form.email), users.includes(form.username));
                if (!emails.includes(form.email) && !users.includes(form.username)){
                    dispatch(codeAccountAction(form.username, form.name, form.email, form.password))

                }
                else{
                    setError(verifier.error)
                }
            }
            
        
      }
    return (
        <Formik
      validationSchema={schema}
      onSubmit={handlerSubmit}
      initialValues={{
        name: '',
        email: '',
        username: '',
        password: '',
        confirm: '',
      }}>
         {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
                
                {error?<Alert variant='danger'>{error}</Alert>:null}
                <Row className="mb-3">
                
                <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder='Input your name...'
                        value={values.name}
                        onChange={handleChange}
                        isValid={touched.name && !errors.name}
                        isInvalid={!!errors.name}
                        feedback={errors.name}
                    />
                    {errors.name?<p style={{color:'red', fontSize:'1.1rem'}} className='mt-2 mb-2'>*{errors.name}</p>:null}
                </Row>
                <Row className="mb-3">
                
                <Form.Label>E-mail</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={values.email}
                        placeholder='email@email.com'
                        onChange={handleChange}
                        isValid={touched.email && !errors.email}
                        onBlur={(e)=>{verifierAccountAction(values.username, values.email)}}
                        
                        
                    />
                </Row>
                {errors.email?<p style={{color:'red', fontSize:'1.1rem'}} className='mt-2 mb-2'>*{errors.email}</p>:null}
                <Row className="mb-3">
               
                <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        isValid={touched.username && !errors.username}
                        isInvalid={!!errors.username}
                        feedback={errors.username}
                        onBlur={()=>{verifierAccountAction(values.username, values.email)}}
                    />
                </Row>
                {errors.username?<p style={{color:'red', fontSize:'1.1rem'}} className='mt-2 mb-2'>*{errors.username}</p>:null}
                <Row className="mb-3">
                
                <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isValid={touched.password && !errors.password}
                        isInvalid={!!errors.password}
                        feedback={errors.password}
                    />
                </Row>
                {errors.password?<p style={{color:'red', fontSize:'1.1rem'}} className='mt-2 mb-2'>*{errors.password}</p>:null}
                <Row className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="confirm"
                        value={values.confirm}
                        onChange={handleChange}
                        isValid={touched.confirm && !errors.confirm}
                        isInvalid={!!errors.confirm}
                        feedback={errors.confirm}
                        feedbackType="invalid"
                    />
                </Row>
                <Row className="mb-3">
                <Button type='submit' onClick={handleSubmit} variant='primary'>Register</Button>
                </Row>
                

            </Form>
         )}
      </Formik>
        // <Form>
        //     <Form.Label key='name'>Name</Form.Label>
        //     <Form.Control name='name' id='name'></Form.Control>
        //     <Form.Label key='email'>E-mail</Form.Label>
        //     <Form.Control name='email' id='email'></Form.Control>
        //     <Form.Label key='name'>Password</Form.Label>
        //     <Form.Control name='name' id='name'></Form.Control>
        //     <Form.Label key='name'>Repeat Password</Form.Label>
        //     <Form.Control name='name' id='name'></Form.Control>
        // </Form>
    )
}