import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreeen";
import './App.css'
import StocksScreen from "./screens/StocksScreen";
import PredictScreen from "./screens/PredictScreen";



function AppRoutes() { 
    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<LoginScreen/>}></Route>
                <Route path="/" element={<HomeScreen/>}></Route>
                <Route path="/stocks" element={<StocksScreen />}></Route>
                <Route path="/stockspred" element={<PredictScreen />}></Route>
            </Routes>
        </BrowserRouter>
    )
 }

 export default AppRoutes