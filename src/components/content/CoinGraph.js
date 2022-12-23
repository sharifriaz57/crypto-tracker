import React from 'react';
import { Line } from 'react-chartjs-2';
import { ColorContext, CurrencyContext } from '../../context/ColorModeContext';
import { chartDataAPI } from '../../api/api';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
    
const CoinGraph = ({ id, price_change_percentage_24h }) => {
    const { currency } = CurrencyContext();
    const [graph, setGraph] = React.useState([]);
    const { mode } = ColorContext();
    // const isPriceIncreasing = price_change_percentage_24h > 0;
    
    console.count("CoinGraph");
    React.useEffect(() => {
        if (typeof id !== 'undefined') {
            getCoinChart()
        }
    }, [id])
    
    const getCoinChart = async () => {
        const {data} = await axios.get(chartDataAPI(id, currency, 7));
        setGraph(data.prices);        
    }
    
    const labels = [];
    const price = [];
    
    graph.length > 0 && graph.map(p => {
        labels.push(p[0]);
        price.push(p[1]);
    })

    const options = {
        plugins: {
            legend: {
                display: false
            }
        },
        elements: {
            point: {
                radius: 0.5
            }
        },
        scales: {
            x: {
                display: false
            },
            y: {
                display: false
            },
            
        }
    }
    
    const datas = {
        labels,
        datasets: [
            {
            fill: true,
            data: price,
            // borderColor: `${isPriceIncreasing ? '#5bcf0e' : '#eb2553'}`,
            borderColor: `${mode === 'light' ? '#3f51b5' : '#00bcd4'}`,
            pointBorderWidth: 0,
            borderWidth: 1.5
            }
        ],
    };

    return (
        <div style={{ height: '70px'}}>
            <Line style={{ marginLeft: 'auto' }}
                options={options}
                data={datas}
            />
        </div>
    )
}

export default React.memo(CoinGraph)