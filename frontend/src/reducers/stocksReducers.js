import { CANDLE_FAIL, CANDLE_REQUEST, CANDLE_SUCCESS } from "../constants/stocksConstants";

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