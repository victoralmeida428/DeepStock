import {useDispatch, useSelector} from "react-redux";
import BaseScreen from "./BaseScreen";
import Message from "../components/Message";
import {useEffect, useState} from "react";
import {candleChart, infoStocksTable} from "../actions/stocksActions";
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
    
    const candle = useSelector(state => state.candleChart)
    const {error, loading, data} = candle
    const [search, setSearch] = useState('')

    const submitHandler = (e) => {
        var stocks = search.toUpperCase();
        stocks = stocks.replaceAll(/\s{1,}/g, ',')
        const stocks_array = stocks.split(',')
        dispatch(candleChart(stocks_array.filter(item => item.trim() !== '')))
        dispatch(infoStocksTable(stocks_array.filter(item => item.trim() !== '')))
    }

    useEffect(() => {
        dispatch(candleChart(['^BVSP']))
        dispatch(infoStocksTable(['PETR4.SA']))
    }, [dispatch])

    return (
        <BaseScreen>
            {
                userInfo
                    ? loading
                        ? <Loader/>
                        : <Container>
                                <FormStocks
                                    onSubmit={submitHandler}
                                    onChange={(e) => setSearch(e.target.value)}/>
                                    {infoReducer.loading?<Loader />:<TableInfo data={infoReducer.data.data?infoReducer.data.data:[{'info':1}]}/>}
                                    <CandleStick data={data}/>
                            </Container>

                    : <Message variant='light'>Please, make
                            <a className="ms-1" href="/login">login</a>
                        </Message>
            }
        </BaseScreen>
    )
}