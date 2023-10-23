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
    const [method, setMethod] = useState('Prophet')

    useEffect(() => {
        if (method === 'Prophet') {
            dispatch(predStockAction(stock))
        }
        else {
            dispatch(predTorchStockAction(stock))
        }
    }, [dispatch, stock, method])
    const Chart = ()=>{
        if(method==='Prophet'){
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
        else {
            console.log(predStockDL);
            const div = 
                predStockDL.loading
                    ? <Loader/>
                    : predStockDL.data
                        ? <div className="d-flex justify-content-center align-items-center">
                        <ChartTorch stock={stock} data={predStockDL.data}/>
                    </div> : 
                    predStockDL.error?<h3 className="text-center mt-4">{predStockDL.error}</h3>:
                    <h3 className="text-center mt-4">Insert a ticket</h3>
                        
            return div
        }
        
    }
    return (
        <BaseScreen>
            <Container>
                <FormStocks
                    isMulti={false}
                    onChange={(e) => setStock(
                        e
                            ? e.value
                            : ''
                    )}>
                    <Select
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                width: '200px'
                            })
                        }}
                        defaultValue={{
                            value: 'Prophet',
                            label: 'Prophet'
                        }}
                        options={[
                            {
                                value: 'Prophet',
                                label: 'Prophet'
                            }, {
                                value: 'Deep Learning',
                                label: 'Deep Learning'
                            }
                        ]}
                        onChange={(e) => setMethod(e.value)}
                        className="ms-3" ></Select>
                </FormStocks>

                {Chart()}
                
            </Container>
        </BaseScreen>
    )
}