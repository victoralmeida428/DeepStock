import { CANDLE_FAIL, CANDLE_REQUEST, CANDLE_SUCCESS, FAV_STOCKS_FAIL, FAV_STOCKS_REQUEST, FAV_STOCKS_SUCCESS, FAV_STOCKS_UPDATE__FAIL, FAV_STOCKS_UPDATE__REQUEST, FAV_STOCKS_UPDATE__SUCCESS, INFO_FAIL, INFO_REQUEST, INFO_SUCCESS, PREDICT_STOCK_FAIL, PREDICT_STOCK_REQUEST, PREDICT_STOCK_SUCCESS, PREDICT_STOCK_TORCH_FAIL, PREDICT_STOCK_TORCH_REQUEST, PREDICT_STOCK_TORCH_SUCCESS } from "../constants/stocksConstants";

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

export const favStocksReducer = (state={data:[]}, action) => {
    switch (action.type){
        case FAV_STOCKS_REQUEST:
            return {loading: true}
        case FAV_STOCKS_SUCCESS:
            return {loading: false, data: action.payload}
        case FAV_STOCKS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const favStocksUpdateReducer = (state={}, action) => {
    switch (action.type){
        case FAV_STOCKS_UPDATE__REQUEST:
            return {loading: true}
        case FAV_STOCKS_UPDATE__SUCCESS:
            return {loading: false, sucess: action.payload}
        case FAV_STOCKS_UPDATE__FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const PredStocksReducer = (state={data:[]}, action) => {
    switch (action.type){
        case PREDICT_STOCK_REQUEST:
            return {loading: true}
        case PREDICT_STOCK_SUCCESS:
            return {loading: false, data: action.payload}
        case PREDICT_STOCK_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}
export const PredTorchStocksReducer = (state={}, action) => {
    switch (action.type){
        case PREDICT_STOCK_TORCH_REQUEST:
            return {loading: true}
        case PREDICT_STOCK_TORCH_SUCCESS:
            return {loading: false, data: action.payload}
        case PREDICT_STOCK_TORCH_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}