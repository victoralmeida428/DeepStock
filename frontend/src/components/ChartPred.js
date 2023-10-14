import { Container } from "react-bootstrap";
import Plot from "react-plotly.js";

export default function ChartPred({data, stock}) {
    const date = data.map((e)=>e.ds)
    const price = data.map((e)=>e.y)
    const trendPred = data.map((e)=>e.trend)
    const pricePredUpeer = data.map((e)=>e.yhat_upper)
    const pricePredLower = data.map((e)=>e.yhat_lower)
    const traces = [{
        x: date,
        y: price,
        type: 'scatter',
        name: 'Price'
    }, {
        x:date,
        y: trendPred,
        type: 'scatter',
        name: 'Price Predict (trend)'
    }, 
    {
        x:date,
        y: pricePredUpeer,
        type: 'scatter',
        name: 'Price Predict (Higher)'
    },
    {
        x:date,
        y: pricePredLower,
        type: 'scatter',
        name: 'Price Predict (Lower)'
    }]

    const layout = {
        title:`Predict ${stock}`,
        margin: {
            r: 10,
            t: 50,
            b: 40,
            l: 60
        },
        showlegend: true,
        xaxis: {
            autorange: true,
            type: 'date',
            showgrid: false
        },
        yaxis: {
            autorange: true,
            type: 'linear',
            showgrid: false
        },
        plot_bgcolor: 'white', // Define o plano de fundo do gráfico como transparente
        paper_bgcolor: '#cad4e3'
      };
    return (
        <Plot className="mt-4 mb-2" data={traces} layout={layout}/>
    )
    
}