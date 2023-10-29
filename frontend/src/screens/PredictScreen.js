import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {predStockAction, predTorchStockAction} from "../actions/stocksActions";
import BaseScreen from "./BaseScreen";
import {Container, Form} from "react-bootstrap";
import Loader from "../components/Loader";
import FormStocks from "../components/Form/Forms";
import ChartPred from "../components/ChartPred";
import Select from "react-select";
import ChartTorch from "../components/ChartTorch";

export default function PredictScreen() {
    const dispatch = useDispatch()
    const predStock = useSelector(state => state.predStock)
    const predStockDL = useSelector(state => state.torchPredStock)
    const {data, loading, error} = predStock
    const [stock, setStock] = useState('')

    useEffect(() => {
            dispatch(predStockAction(stock))
    }, [dispatch, stock])
    const Chart = ()=>{
            const div = 
                loading
                    ? <Loader/>
                    : !data
                        ? <h3 className="text-center mt-4">Insert a ticket</h3>
                        : <div className="d-flex justify-content-center align-items-center">
                                <ChartPred stock={stock} data={data}/>
                            </div>
            return div
        }

    return (
        <BaseScreen>
            <Container>
                <FormStocks
                    button={false}
                    isMulti={false}
                    onChange={(e) => setStock(
                        e
                            ? e.value
                            : ''
                    )}>
                </FormStocks>

                {Chart()}
                
            </Container>
        </BaseScreen>
    )
}