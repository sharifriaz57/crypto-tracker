import React from 'react'
import { trendingCoinsAPI } from '../../api/api';
import axios from 'axios';
import { CurrencyContext } from '../../context/ColorModeContext';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Typography } from '@mui/material';
import getSymbolFromCurrency from 'currency-symbol-map'
import { Link } from 'react-router-dom';

export const numberWithCommas = (n) => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const BannerCarousel = () => {
  const [trendingCoins, setTrendingCoins] = React.useState([]);
  const { currency } = CurrencyContext();

  const getCoinList = async () => {
    const { data } = await axios.get(trendingCoinsAPI(currency));
    setTrendingCoins(data);
  }

  React.useEffect(() => {
    getCoinList()
  }, [currency])

  const items = trendingCoins.map(item => {
    const coinPriceGain = item.price_change_percentage_24h > 0;

    return (
      <Link to={`/coin/${item.id}`} key={item.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
        <img src={item?.image} alt={item.id} style={{ maxWidth: '75px', height: '75px', objectFit: 'contain', marginBottom: '0.5rem' }} />
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '0.5rem' }}>
            <Typography variant="subtitle1" sx={{ color: '#fff' }}>
              {item.symbol.toUpperCase()}
            </Typography>
          </span>
          <span>
            {coinPriceGain
              ? <Typography variant="body1" sx={{ fontWeight: '600', color: '#5bcf0e' }}>
                +{item.price_change_percentage_24h.toFixed(2)}%
              </Typography>
              : <Typography variant="body1" sx={{ fontWeight: '600', color: '#eb2553' }}>
                {item.price_change_percentage_24h.toFixed(2)}%
              </Typography>
            }
          </span>
        </div>
        <div style={{ display: 'flex' }}>
          <Typography variant="h5" sx={{ marginRight: '0.25rem', color: '#fff' }}>
            {
              typeof getSymbolFromCurrency(currency) === 'undefined'
                ? currency.toUpperCase()
                : getSymbolFromCurrency(currency)
            }
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#fff' }}>
            {numberWithCommas(item.current_price.toFixed(2))}
          </Typography>
        </div>
      </Link>
    )
  })

  const responsive = {
    0: {
      items: 2,
    },
    600: {
      items: 4
    },
    768: {
      items: 5
    },
    992: {
      items: 6
    },
    1400: {
      items: 8
    }
  }

  return (
    <AliceCarousel mouseTracking items={items} disableDotsControls={true}
      disableButtonsControls={true} autoPlay={true} animationType={`fadeout`} animationDuration={750}
      autoPlayInterval={2000} infinite={true} responsive={responsive}
    />
  )
}

export default BannerCarousel