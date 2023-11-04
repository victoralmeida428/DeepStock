import { useDispatch, useSelector } from "react-redux";
import BaseScreen from "./BaseScreen";
import { useEffect, useState } from "react";
import { stocksInformationsAction } from "../actions/informationsActions";
import FormStocks from "../components/Form/Forms";
import { Card, Nav } from "react-bootstrap";
import CustomTable from "../components/CustomTable";
import Loader from "../components/Loader";
import Message from "../components/Message";

export default function InformationScreen() {
    const dispatch = useDispatch()
    const [stock, setStock] = useState('')
    const info = useSelector((state) => state.stocksInformations)
    const loginReducer = useSelector(state => state.userLogin)
    const {userInfo} = loginReducer
    const [balace, setBalance] = useState(true)
    const [finan, setFinan] = useState(false)
    const [cash, setCash] = useState(false)
    console.log(stock, info)

    useEffect(()=>{
        dispatch(stocksInformationsAction(stock))
    },[ dispatch, stock])

    const body = ()=>{
        if (info.data&&balace){
            const data = info.data.balance
            return (Object.entries(data).map(([index, value], i)=>
            <tr key={i}>
                <td key={index}>{index}</td>
                <td key={value}>{value}</td>
            </tr>))
        }
        if (info.data&&finan){
            const data = info.data.financial
            return (Object.entries(data).map(([index, value], i)=>
            <tr key={i}>
                <td key={index}>{index}</td>
                <td key={value}>{value}</td>
            </tr>))
        }
        if (info.data&&cash){
            const data = info.data.cash_flow
            return (Object.entries(data).map(([index, value], i)=>
            <tr key={i}>
                <td key={index}>{index}</td>
                <td key={value}>{value}</td>
            </tr>))
        }
    }

    return (
        <BaseScreen>
            <FormStocks onChange={(e)=>setStock(e?e.value:'')}></FormStocks>
            <Card className="mt-3 p-2">
                <Nav variant="tabs" justify>
                    <Nav.Item>
                        <Nav.Link active={balace} onClick={()=>{
                            setBalance(true)
                            setFinan(false)
                            setCash(false)
                            
                        }}>Balance</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link active={cash} onClick={()=>{
                            setBalance(false)
                            setFinan(false)
                            setCash(true)
                            
                        }}>CashFlow</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link active={finan} onClick={()=>{
                            setBalance(false)
                            setFinan(true)
                            setCash(false)
                            
                        }}>Financials</Nav.Link>
                    </Nav.Item>
                </Nav>
                {userInfo?<CustomTable body={body}/>:<Message variant='secondary'>Please, make <a href="login">login</a></Message>}
                {info.loading?<Loader/>:null}
            </Card>
        </BaseScreen>
    )
}
