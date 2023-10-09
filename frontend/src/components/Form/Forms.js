import {Form, FormText} from "react-bootstrap";

export default function FormStocks({onChange, onSubmit}) {
    const enterHandler = (e)=>{
        if(e.keyCode === 13){
            return onSubmit
        }
    }
    return (
        <Form className="m-3" onSubmit={onSubmit}>
            <Form.Label>Stocks</Form.Label>
            <Form.Control onChange={onChange} onKeyDown={enterHandler} type="text" name="stocks"/>
        </Form>
    )

}