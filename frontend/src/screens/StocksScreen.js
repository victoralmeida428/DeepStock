import {useDispatch, useSelector} from "react-redux";
import BaseScreen from "./BaseScreen";
import Message from "../components/Message";
import {useEffect, useState} from "react";
import {candleChart} from "../actions/stocksActions";
import CandleStick from "../components/Stocks/chart";
import Loader from "../components/Loader";
import {Container, Stack} from "react-bootstrap";
import FormStocks from "../components/Form/Forms";

export default function StocksScreen() {
    const dispatch = useDispatch()
    const loginReducer = useSelector(state => state.userLogin)
    const {userInfo} = loginReducer
    const candle = useSelector(state => state.candleChart)
    const {error, loading, data} = candle
    const [search, setSearch] = useState('')

    const submitHandler = (e)=>{
        var stocks = search.toUpperCase();
        stocks = stocks.replaceAll(/\s{1,}/g, ',')
        const stocks_array = stocks.split(',')
        dispatch(candleChart(stocks_array.filter(item => item.trim() !== '')))
    }

    useEffect(() => {
        dispatch(candleChart(['^BVSP']))
    }, [dispatch])

    
    const charts = () => 
    <Stack className="charts" direction="vertical">
        <CandleStick className='mt-5' data={data}/>
    </Stack>
    return (
        <BaseScreen>
            {
                userInfo
                    ? loading
                        ? <Loader/>
                        :
                    <Container>
                    <FormStocks onSubmit={submitHandler} onChange={(e)=>setSearch(e.target.value)}/>
                    {charts()}
                    </Container>
                    
                    : <Message variant='light'>Please, make
                            <a href="/login">login</a>
                        </Message>
            }
        </BaseScreen>
    )
}