import { legacy_createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { PredStocksReducer, PredTorchStocksReducer, favStocksReducer, favStocksUpdateReducer, infoStocksReducer, stocksCandleReducer } from './reducers/stocksReducers'
import { codeRegisterReducer, userLoginReducer, userRegisterReducer, userVerifierReducer } from './reducers/userReducers'
import { stocksInfoReducer } from './reducers/infoReducers'

const reducer = combineReducers({
    candleChart: stocksCandleReducer,
    infoStocks: infoStocksReducer,
    userLogin: userLoginReducer,
    favStocks: favStocksReducer,
    favStocksUpdate: favStocksUpdateReducer,
    predStock: PredStocksReducer,
    torchPredStock: PredTorchStocksReducer,
    userVerifier: userVerifierReducer,
    userRegister: userRegisterReducer,
    codeRegister: codeRegisterReducer,
    stocksInformations: stocksInfoReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = legacy_createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store