import {useDispatch, useSelector} from "react-redux";
import BaseScreen from "./BaseScreen";
import Message from "../components/Message";
import {useEffect, useState} from "react";
import {candleChart, favStocksAction, infoStocksTable} from "../actions/stocksActions";
import CandleStick from "../components/Stocks/chart";
import Loader from "../components/Loader";
import {Carousel, Container, Stack} from "react-bootstrap";
import FormStocks from "../components/Form/Forms";
import TableInfo from "../components/TableInfo";

export default function StocksScreen() {
    const dispatch = useDispatch()
    const loginReducer = useSelector(state => state.userLogin)
    const {userInfo} = loginReducer
    const infoReducer = useSelector(state => state.infoStocks)
    const favReducer = useSelector(state => state.favStocks)


    const candle = useSelector(state => state.candleChart)
    const {error, loading, data} = candle
    const [search, setSearch] = useState('')
    
    const submitHandler = (e) => {
        e.preventDefault()
        var stocks = search.map((e)=>e.value)
        stocks = stocks.map((e)=>e.toUpperCase());
        stocks = stocks.map((e)=>e.trim());
        dispatch(candleChart(stocks.filter(item => item.trim() !== '')))
        dispatch(infoStocksTable(stocks.filter(item => item.trim() !== '')))
    }

    useEffect(() => {
        dispatch(candleChart(['PETR4.SA']))
        dispatch(infoStocksTable(['PETR4.SA']))
        dispatch(favStocksAction(userInfo.id))
    }, [dispatch])


    return (
        <BaseScreen>
            <Container>
                {userInfo?<FormStocks
                                    onSubmit={submitHandler}
                                    onChange={(e) => setSearch(e)}/>:''}
            
            {
                userInfo
                    ? loading
                        ? <Loader/>
                        : <>
                                
                                    {infoReducer.loading?<Loader />:
                                    <TableInfo favs={favReducer&&favReducer.data?favReducer.data.map((e)=>e.stock):['']} data={infoReducer.data.data?infoReducer.data.data:[{'info':1}]}/>}
                                    <CandleStick data={data}/>
                            </>

                    : <Message variant='light'>Please, make
                            <a className="ms-1" href="/login">login</a>
                        </Message>
            }
            </Container>
        </BaseScreen>
    )
}