import { Carousel } from "react-bootstrap";
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
                title: {
                    text: e.stock
                },
                dragmode: 'zoom',
                margin: {
                    r: 10,
                    t: 50,
                    b: 40,
                    l: 60
                },
                showlegend: false,
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
            }
        }
    })
    return (<Carousel className="mt-0" data-bs-theme="dark">
    {traces.map((trace, index) => (
      <Carousel.Item key={index} interval={5000}>
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Plot className={className} data={trace.data} layout={trace.layout} />
        </div>
      </Carousel.Item>
    ))}
  </Carousel>)
}
