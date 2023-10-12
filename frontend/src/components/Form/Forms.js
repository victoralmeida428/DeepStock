import {Col, Form, FormText, Row} from "react-bootstrap";
import Creatable from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import { STOCKS_LIST_DEFAULT } from "../../constants/stocksConstants";

export default function FormStocks({onChange, onSubmit}) {
    const animatedComponents = makeAnimated();
    const enterHandler = (e) => {
        if (e.keyCode === 13) {
            return onSubmit
        }
    }
    return (
        <Row>
            <Col md={6}>
                <Form className="mt-3" onSubmit={onSubmit}>
                    <Form.Label>Stocks</Form.Label>
                    <Creatable 
                    isClearable 
                    isMulti 
                    components={animatedComponents}
                    options={STOCKS_LIST_DEFAULT}
                    placeholder="search your stocks..."
                    onChange={onChange}
                    onKeyDown={enterHandler}

                    ></Creatable>
                    
                    {/* <Form.Control
                        placeholder="search your stocks..."
                        onChange={onChange}
                        onKeyDown={enterHandler}
                        type="text"
                        name="stocks"/> */}
                </Form>
            </Col>
        </Row>
    )

}