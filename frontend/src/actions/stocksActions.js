import {CANDLE_REQUEST, CANDLE_SUCCESS, CANDLE_FAIL, INFO_REQUEST, INFO_SUCCESS, INFO_FAIL, FAV_STOCKS_REQUEST, FAV_STOCKS_SUCCESS, FAV_STOCKS_FAIL, FAV_STOCKS_UPDATE__REQUEST, FAV_STOCKS_UPDATE__SUCCESS, FAV_STOCKS_UPDATE__FAIL} from '../constants/stocksConstants'
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

export const favStocksAction = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: FAV_STOCKS_REQUEST
        })
        const {userLogin:{userInfo}} = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await api.get(`stocks/${id}/fav`, config)
        dispatch({
            type: FAV_STOCKS_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: FAV_STOCKS_FAIL,
            error: error.response && error.response.data.detail?error.response.data.detail:error.message
        })

    }
}

export const favStocksUpdateAction = (id, input) => async (dispatch, getState) => {
    try{
        dispatch({
            type: FAV_STOCKS_UPDATE__REQUEST
        })
        const {userLogin:{userInfo}} = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await api.post(`stocks/${id}/fav/update`, input, config)
        dispatch({
            type: FAV_STOCKS_UPDATE__SUCCESS,
            payload: data.success
        })
    }
    catch (error) {
        dispatch({
            type: FAV_STOCKS_UPDATE__FAIL,
            error: error.response && error.response.data.detail?error.response.data.detail:error.message
        })

    }
}