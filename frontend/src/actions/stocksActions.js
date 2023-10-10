import {CANDLE_REQUEST, CANDLE_SUCCESS, CANDLE_FAIL, INFO_REQUEST, INFO_SUCCESS, INFO_FAIL} from '../constants/stocksConstants'
import api from '../Api'

export const candleChart = (stocks, start='', end='')=> async(dispatch, getState) => {
    try{
        dispatch({
            type: CANDLE_REQUEST
        })
        const {userLogin:{userInfo}} = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await api.post('stocks', {stocks: stocks, start:start, end:end}, config)
        dispatch({
            type: CANDLE_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: CANDLE_FAIL,
            error: error.response && error.response.data.detail?error.response.data.detail:error.message
        })

    }


}

export const infoStocksTable = (stocks) => async(dispatch, getState) => {
    try{
        dispatch({
            type: INFO_REQUEST
        })
        const {userLogin:{userInfo}} = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await api.post('stocksinfo', {stocks: stocks}, config)
        dispatch({
            type: INFO_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: INFO_FAIL,
            error: error.response && error.response.data.detail?error.response.data.detail:error.message
        })

    }
}