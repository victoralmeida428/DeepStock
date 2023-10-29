import Plot from "react-plotly.js";
import './charts.css'

export default function ChartPred({data, stock}) {
    if (!data.error){
    const date = data.map((e)=>e.ds)
    const price = data.map((e)=>e.y)
    const trendPred = data.map((e)=>e.trend)
    const pricePredUpeer = data.map((e)=>e.yhat_upper)
    const pricePredLower = data.map((e)=>e.yhat_lower)
    const traces = [{
        x: date,
        y: price,
        type: 'scatter',
        name: 'Price',
        line: {color: 'rgba(0,0,0,0.6)'}
    }, {
        x:date,
        y: trendPred,
        type: 'scatter',
        name: 'Price Predict (trend)',
        line: {
            dash: 'dash',
        }
    }, 
    {
        x:date,
        y: pricePredUpeer,
        type: 'scatter',
        name: 'Price Predict (Higher)',
        line: {
            dash: 'dash',
        }
    },
    {
        x:date,
        y: pricePredLower,
        type: 'scatter',
        name: 'Price Predict (Lower)',
        line: {
            dash: 'dash',
        }
    }]

    const layout = {
        title:`Predict ${stock}`,
        margin: {
            r: 10,
            t: 50,
            b: 40,
            l: 60
        },
        width: '100%', // 100% da largura da div
        height: '100%', // 100% da altura da div
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
        <div className="mt-4 mb-2 chart-container">
            <Plot data={traces} layout={layout}/>
        </div>        
    )
}
    
}