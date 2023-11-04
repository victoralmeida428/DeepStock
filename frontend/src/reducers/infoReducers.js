import { STOCKS_INFORMATIONS_FAIL, STOCKS_INFORMATIONS_REQUEST, STOCKS_INFORMATIONS_SUCCESS } from "../constants/informatiosConstants"

export const stocksInfoReducer = (state={}, action) =>{
    switch (action.type){
        case STOCKS_INFORMATIONS_REQUEST:
            return {loading: true}

        case STOCKS_INFORMATIONS_SUCCESS:
            return {loading: false, data:action.payload}

        case STOCKS_INFORMATIONS_FAIL:
            return {loading: false, error: action.payload}
            
        default:
            return state
    }
}