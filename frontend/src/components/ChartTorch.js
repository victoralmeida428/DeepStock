import Plot from "react-plotly.js";

export default function ChartTorch({data, stock}) {
    
    const date = data.filter(e=>e.name==='real').map(e=>e.date)
    const price = data.filter(e=>e.name==='real').map(e=>e.close)

    const xtrain = data.filter((e)=>e.name=='train').map((e)=>e.date)
    const trainPred = data.filter((e)=>e.name=='train').map((e)=>e.close)

    const xtest = data.filter((e)=>e.name=='test').map((e)=>e.date)    
    const testPred = data.filter((e)=>e.name=='test').map((e)=>e.close)

    const xfuture = data.filter((e)=>e.name=='Future').map((e)=>e.date)    
    const futurePred = data.filter((e)=>e.name=='Future').map((e)=>e.close)

    console.log('date => ',xfuture);
    console.log('price =>' ,futurePred);
    const traces = [{
        x: date,
        y: price,
        type: 'scatter',
        name: 'Price Real',
        line: {
            color:'rgba(0,0,0,0.6'
        }
    }, 
    {
        x:xtest,
        y: testPred,
        type: 'scatter',
        name: 'Price Predict (test)',
        line: {
            dash: 'dash',
            color: 'green'
        }
    }, 
    {
        x:xtrain,
        y: trainPred,
        type: 'scatter',
        name: 'Price Predict (train)',
        line: {
            dash: 'dash',
            color: 'blue'
        }
    },
    {
        x:xfuture,
        y: futurePred,
        type: 'scatter',
        name: 'Price Predict (future)',
        mode:'lines',
        line: {
            dash: 'dash',
            color: 'orange'
        }
    }

]

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