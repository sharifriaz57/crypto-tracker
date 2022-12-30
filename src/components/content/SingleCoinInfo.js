
import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { CircularProgress, ToggleButton, ToggleButtonGroup, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ColorContext, CurrencyContext } from '../../context/ColorModeContext';
import Container from '@mui/material/Container';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { chartDataAPI } from '../../api/api';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import CoinInfo from './CoinInfo';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SingleCoinInfo = (props) => {
  const { id, name, symbol } = props;
  const theme = useTheme();
  const { currency } = CurrencyContext();
  const { mode } = ColorContext();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));
  const [loading, setLoading] = React.useState(false);
  const [chartData, setChartData] = React.useState([]);
  const [dataParams, setDataParams] = React.useState({ day: 1, option: 'prices' });

  const handleDataParams = (event, param) => {
    const number = typeof param === 'number' || param === 'max';
    setDataParams(prev => number ? {...prev, day: param} : {...prev, option: param})
  };
  
  const getChartData = React.useCallback(async () => {
    setLoading(true)
    if (id && currency) {
      const { data } = await axios.get(chartDataAPI(id, currency, dataParams.day));
      setChartData(data);
    }
    setLoading(false);
  }, [id, currency, dataParams])
  
  React.useEffect(() => {
    getChartData();
  }, [getChartData, id, currency, dataParams])
  
  const options = {
    elements: {
      point: {
        radius: 1
      }
    },
    scales: {
      x: {
        ticks: {
          color: `${mode === 'light' ? '#685f68' : '#9f9d99'}`
        }
      },
      y: {
        ticks: {
          color: `${mode === 'light' ? '#685f68' : '#9f9d99'}`
        }
      },
      
  }
  }

  const prices = [];
  
  const labels = chartData[dataParams.option]?.map(price => {
    prices.push(price[1]);
    const date = new Date(price[0]);
  
    switch (true) {
      case dataParams.day === 1:
        return date.toLocaleTimeString('default', {
          hour: '2-digit',
          minute: '2-digit',
        })
      case [7,14].includes(dataParams.day):
        return date.toLocaleTimeString('default', {
          day: "2-digit",
          month: "short",
          hour: '2-digit',
          minute: '2-digit'
        })
      case [30,180].includes(dataParams.day):
        return date.toLocaleDateString('default', {
          day: "2-digit",
          month: "short"
        })
      case dataParams.day === 365:
        return date.toLocaleDateString('default', {
          day: "2-digit",
          month: "short",
          year: "numeric"
        })
      default:
        return date.toLocaleDateString();
    }
    
  });

  const datas = {
    labels,
    datasets: [
      {
        fill: true,
        pointHoverBorderWidth: 7,
        label: `${dataParams.option.toUpperCase()} (Past ${dataParams.day} days) in ${currency.toUpperCase()}`,
        data: prices,
        borderColor: `${mode === 'light' ? '#3f51b5' : '#00bcd4'}`,
        tension: 0.1,
        pointBorderWidth: 0
      },
    ],
  };
  
  return (
    <Container maxWidth="xl" sx={{ flexGrow: 1, marginTop: '3rem' }} >
      <Grid container spacing={4}>
        <Grid lg={3}>
          <CoinInfo {...props} />
        </Grid>
        <Grid lg={9} sx={ matches && { paddingLeft: '4rem' }}>
          <Typography variant="h5" color='text.primary' display="block" gutterBottom sx={{ fontWeight: '700' }}>
            {name} Price Chart ({currency?.toUpperCase()}/{symbol?.toUpperCase()})
          </Typography>

          <div style={{ display: 'flex', gap: '0.5rem 1rem', marginBottom: '1rem', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <ToggleButtonGroup
              value={dataParams.option}
              exclusive
              size='small'
              onChange={handleDataParams}
              color='primary'
              sx={{ flexWrap: 'wrap' }}
            >
              <ToggleButton value="prices" sx={{ padding: '0.25rem 1rem', borderColor: 'text.secondary' }}>
                Price
              </ToggleButton>
              <ToggleButton value="market_caps" sx={{ padding: '0.25rem 1rem', borderColor: 'text.secondary' }}>
                Market Cap
              </ToggleButton>
            </ToggleButtonGroup>

            <ToggleButtonGroup
              value={dataParams.day}
              exclusive
              size='small'
              onChange={handleDataParams}
              color='primary'
              sx={{ flexWrap: 'wrap' }}
            >
              <ToggleButton value={1} sx={{ padding: '0.25rem 1rem', borderColor: 'text.secondary' }}>
                24h
              </ToggleButton>
              <ToggleButton value={7} sx={{ padding: '0.25rem 1rem', borderColor: 'text.secondary' }}>
                7d
              </ToggleButton>
              <ToggleButton value={14} sx={{ padding: '0.25rem 1rem', borderColor: 'text.secondary' }}>
                14d
              </ToggleButton>
              <ToggleButton value={30} sx={{ padding: '0.25rem 1rem', borderColor: 'text.secondary' }}>
                30d
              </ToggleButton>
              <ToggleButton value={180} sx={{ padding: '0.25rem 1rem', borderColor: 'text.secondary' }}>
                180d
              </ToggleButton>
              <ToggleButton value={365} sx={{ padding: '0.25rem 1rem', borderColor: 'text.secondary' }}>
                1y
              </ToggleButton>
              <ToggleButton value='max' sx={{ padding: '0.25rem 1rem', borderColor: 'text.secondary' }}>
                Max
              </ToggleButton>
            </ToggleButtonGroup>
          </div>

          <div style={{ minHeight: '10vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {loading 
              ? <CircularProgress color="primary" />
              : <Line
                options={options}
                data={datas}
              />
            }
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}

export default React.memo(SingleCoinInfo)