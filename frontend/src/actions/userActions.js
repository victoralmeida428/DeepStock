import api from "../Api"
import { CODE_REGISTER_FAIL, CODE_REGISTER_REQUEST, CODE_REGISTER_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_VERIFIER_FAIL, USER_VERIFIER_REQUEST, USER_VERIFIER_SUCCESS } from "../constants/userConstants"

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

export const verifierAccountAction = () => async (dispatch) => {
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

export const codeAccountAction = (username, name, email, password) => async (dispatch) => {
    try{
        dispatch({
            type: CODE_REGISTER_REQUEST
        })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const {data} = await api.post('send_code', {username:username, name: name, email:email, password:password}, config)
        
        dispatch({
            type: CODE_REGISTER_SUCCESS,
            payload: data
        })

    }
    catch (error) {
        dispatch({
            type: CODE_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}


export const registerAccountAction = (username, name, email, password) => async (dispatch) => {
    try{
        dispatch({
            type: USER_VERIFIER_REQUEST
        })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const {data} = await api.post('user/register', {username:username, name: name, email:email, password:password}, config)
        
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
