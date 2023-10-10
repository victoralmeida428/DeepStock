import { CANDLE_FAIL, CANDLE_REQUEST, CANDLE_SUCCESS, INFO_FAIL, INFO_REQUEST, INFO_SUCCESS } from "../constants/stocksConstants";

export const stocksCandleReducer = (state={data:[]}, action) =>{
    switch (action.type){
        case CANDLE_REQUEST:
            return {loading: true}

        case CANDLE_SUCCESS:
            return {loading: false, data:action.payload}

        case CANDLE_FAIL:
            return {loading: false, error: action.payload}
            
        default:
            return state
    }
}

export const infoStocksReducer = (state={data:[]}, action) => {
    switch (action.type){
        case INFO_REQUEST:
            return {loading: true}
        case INFO_SUCCESS:
            return {loading: false, data: action.payload}
        case INFO_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}