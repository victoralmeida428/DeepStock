import Plot from "react-plotly.js";

export default function CandleStick({className, data}) {
    var traces = data.map((e) => {
        return {
            data: [
                {
                    x: e.date,
                    close: e.close,
                    decreasing: {
                        line: {
                            color: 'red'
                        }
                    },
                    high: e.high,
                    increasing: {
                        line: {
                            color: 'green'
                        }
                    },
                    low: e.low,
                    line: {
                        color: 'rgba(31,119,180,1)'
                    },
                    open: e.open,
                    type: 'candlestick',
                    xaxis: 'x',
                    yaxis: 'y'
                }
            ],
            layout: {
                title:{
                    text: e.stock
                },
                dragmode: 'zoom',
                margin: {
                    r: 10,
                    t: 25,
                    b: 40,
                    l: 60
                },
                showlegend: false,
                xaxis: {
                    autorange: true,
                    type: 'date',
                    showgrid:false
                },
                yaxis: {
                    autorange: true,
                    type: 'linear',
                    showgrid:false
                },
                plot_bgcolor: 'transparent', // Define o plano de fundo do gráfico como transparente
                paper_bgcolor: 'transparent'
            }
        }
    })
    return traces.map((trace) => {
        return (<Plot className={className} data={trace.data} layout={trace.layout}/>)
    })
}
