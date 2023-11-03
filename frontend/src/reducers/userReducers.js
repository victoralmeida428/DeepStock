import { CODE_REGISTER_FAIL, CODE_REGISTER_REQUEST, CODE_REGISTER_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_VERIFIER_FAIL, USER_VERIFIER_REQUEST, USER_VERIFIER_SUCCESS } from "../constants/userConstants";

export const userLoginReducer = (state={}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {loading: true}
        case USER_LOGIN_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_LOGIN_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const userVerifierReducer = (state={}, action) => {
    switch (action.type) {
        case USER_VERIFIER_REQUEST:
            return {loading: true}
        case USER_VERIFIER_SUCCESS:
            return {loading: false, data: action.payload}
        case USER_VERIFIER_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const userRegisterReducer = (state={}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {loading: true}
        case USER_REGISTER_SUCCESS:
            return {loading: false, data: action.payload}
        case USER_REGISTER_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const codeRegisterReducer = (state={}, action) => {
    switch (action.type) {
        case CODE_REGISTER_REQUEST:
            return {loading: true}
        case CODE_REGISTER_SUCCESS:
            return {loading: false, data: action.payload}
        case CODE_REGISTER_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}