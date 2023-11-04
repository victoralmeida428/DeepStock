import api from "../Api"
import { STOCKS_INFORMATIONS_FAIL, STOCKS_INFORMATIONS_REQUEST, STOCKS_INFORMATIONS_SUCCESS } from "../constants/informatiosConstants"

export const stocksInformationsAction = (stock) => async (dispatch, getState) => {
    try{
        dispatch({
            type: STOCKS_INFORMATIONS_REQUEST
        })
        const {userLogin:{userInfo}} = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await api.post(`stocks/completinfo`, {stock: stock}, config)
        dispatch({
            type: STOCKS_INFORMATIONS_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: STOCKS_INFORMATIONS_FAIL,
            error: error.response && error.response?error.response:error.message?error.message:error
        })

    }
}
