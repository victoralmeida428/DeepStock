import {Button, Col, Form, FormText, Row, Stack} from "react-bootstrap";
import Creatable from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import { STOCKS_LIST_DEFAULT } from "../../constants/stocksConstants";
import './Forms.css'

export default function FormStocks({button, onChange, onSubmit, isMulti, children}) {
    const animatedComponents = makeAnimated();
    const enterHandler = (e) => {
        if (e.keyCode === 13) {
            return onSubmit
        }
    }
    return (
        <Row>
            <Col md={3}></Col>
            <Col md={9}>
                
                <Form className="mt-3" onSubmit={onSubmit}>
                    <Form.Label>Stocks</Form.Label>
                    <Stack direction="horizontal">
                    <Creatable 
                    isClearable 
                    isMulti = {isMulti}
                    components={animatedComponents}
                    options={STOCKS_LIST_DEFAULT}
                    placeholder="search your stocks..."
                    onChange={onChange}
                    onKeyDown={enterHandler}

                    ></Creatable>
                    {children}
                    {button?<Button className="ms-3 submit" type="submit" variant="success">Search</Button>:null}
                    </Stack>
                </Form>
                
            </Col>
        </Row>
    )

}