import api from "../Api"
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_VERIFIER_FAIL, USER_VERIFIER_REQUEST, USER_VERIFIER_SUCCESS } from "../constants/userConstants"

export const login = (username, password) => async (dispatch) => {
    try{
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const {data} = await api.post('user/login', {username: username, password: password}, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
}

export const verifierAccountAction = (username, email) => async (dispatch) => {
    try{
        dispatch({
            type: USER_VERIFIER_REQUEST
        })

        const {data} = await api.get('user/verifier')
        dispatch({
            type: USER_VERIFIER_SUCCESS,
            payload: data
        })

    }
    catch (error) {
        dispatch({
            type: USER_VERIFIER_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const registerAccountAction = (username, email, password) => async (dispatch) => {
    try{
        dispatch({
            type: USER_VERIFIER_REQUEST
        })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const {data} = await api.post('user/register', {username:username, email:email, password:password}, config)
        
        dispatch({
            type: USER_VERIFIER_SUCCESS,
            payload: data
        })

    }
    catch (error) {
        dispatch({
            type: USER_VERIFIER_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}
