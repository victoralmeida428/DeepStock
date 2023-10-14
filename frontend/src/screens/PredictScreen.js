import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {predStockAction} from "../actions/stocksActions";
import BaseScreen from "./BaseScreen";
import {Container} from "react-bootstrap";
import Loader from "../components/Loader";
import FormStocks from "../components/Form/Forms";
import ChartPred from "../components/ChartPred";

export default function PredictScreen() {
    const dispatch = useDispatch()
    const predStock = useSelector(state => state.predStock)
    const {data, loading, error} = predStock
    const [stock, setStock] = useState('')

    useEffect(() => {
        dispatch(predStockAction(stock))
    }, [dispatch, stock])

    console.log(stock);
    return (
        <BaseScreen>
            <Container>
                <FormStocks isMulti={false} onChange={(e)=>setStock(e?e.value:'')}/>
                {loading?<Loader />:!data?<h3 className="text-center mt-4">Insert a ticket</h3>:
                <div className="d-flex justify-content-center align-items-center">
                    <ChartPred stock={stock} data={data} />
                </div> }
            </Container>
        </BaseScreen>
    )
}