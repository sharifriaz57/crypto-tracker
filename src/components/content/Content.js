import React from 'react';
import { Container, Pagination, TextField, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { CoinsByMarketCapAPI } from '../../api/api';
import { CurrencyContext } from '../../context/ColorModeContext';
import LinearProgress from '@mui/material/LinearProgress';
import { numberWithCommas } from '../banner/BannerCarousel';
import getSymbolFromCurrency from 'currency-symbol-map';
import { useNavigate } from 'react-router-dom';
import CoinGraph from './CoinGraph';

const Content = () => {
  const [coins, setCoins] = React.useState([]);
  const [searchKey, setSearchKey] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const { currency } = CurrencyContext();
  const navigate = useNavigate();

  const getCoinsByMarketCap = async () => {
    setLoading(true)
    const { data } = await axios.get(CoinsByMarketCapAPI(currency));
    setCoins(data);
    setLoading(false);
  }

  React.useEffect(() => {
      getCoinsByMarketCap();
  }, [currency])

  const handleSearch = React.useCallback(() => {
    return coins.filter(coin =>
      coin.name.toLowerCase().includes(searchKey.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchKey.toLowerCase())
    )
  }, [searchKey, coins])

  const searchResultCount = handleSearch().slice((page - 1) * 10, (page * 10));

  return (
    <>
      <Container maxWidth="lg" sx={{ padding: '2rem 0' }}>
        <Typography variant="h4"
          sx={{
            color: 'text.primary',
            fontWeight: '400',
            textAlign: 'center',
            lineHeight: '1',
            marginBottom: '1.5rem'
          }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>

        <div style={{ marginBottom: '1rem' }}>
          <TextField fullWidth label="Search for a crypto" variant="outlined"
            onChange={(e) => setSearchKey(e.target.value)}
            size="small"
          />
        </div>

        {
          loading
            ? <LinearProgress color="primary" />
            : (<>
              <TableContainer>
                <Table size='small'>
                  <TableHead sx={{ 'td, th': { borderColor: 'background.paper' } }}>
                    <TableRow sx={{ color: 'text.primary' }}>
                      <TableCell sx={{ fontWeight: '600', color: 'text.secondary', minWidth: '25px' }}>#</TableCell>
                      <TableCell sx={{ fontWeight: '600', color: 'text.secondary' }}>Currency</TableCell>
                      <TableCell align="right" sx={{ fontWeight: '600', color: 'text.secondary' }}>Price</TableCell>
                      <TableCell align="right" sx={{ fontWeight: '600', color: 'text.secondary', whiteSpace: 'nowrap' }}>24h Change %</TableCell>
                      <TableCell align="right" sx={{ fontWeight: '600', color: 'text.secondary' }}>Total Volume</TableCell>
                      <TableCell align="right" sx={{ fontWeight: '600', color: 'text.secondary', minWidth: '80px' }}>Market Cap</TableCell>
                      <TableCell align="right" sx={{ fontWeight: '600', color: 'text.secondary' }}>Last 7 days</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      searchResultCount.map((coin, key) => (
                        <TableRow hover
                          key={coin.id}
                          onClick={() => navigate(`/coin/${coin.id}`)}
                          sx={{
                            cursor: 'pointer', '&:last-child td, &:last-child th': { border: 0 },
                            'td, th': { borderColor: 'background.paper' }
                          }}
                        >
                          <TableCell component="th" scope="row" sx={{ width: '25px' }}>
                            <Typography variant="body2"
                              sx={{
                                color: 'text.primary',
                                lineHeight: '1',
                                fontWeight: '300'
                              }}
                            >
                              {(searchResultCount.length * (page - 1)) + key + 1}
                            </Typography>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                              <img src={coin?.image} alt={coin.id} style={{ maxWidth: '45px', height: 'auto', marginRight: '1rem' }} />

                              <div>
                                <Typography variant="h6"
                                  sx={{
                                    lineHeight: '1',
                                    marginBottom: '0.5rem',
                                    fontWeight: '600'
                                  }}
                                >
                                  {coin.name}
                                </Typography>
                                <Typography variant="body2"
                                  sx={{
                                    color: 'text.primary',
                                    lineHeight: '1',
                                    fontWeight: '300'
                                  }}
                                >
                                  {coin.name}
                                </Typography>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: '400' }}>
                            <span style={{ marginRight: '0.1rem' }}>
                              {
                                typeof getSymbolFromCurrency(currency) === 'undefined'
                                  ? currency.toUpperCase()
                                  : getSymbolFromCurrency(currency)
                              }
                            </span>
                            {numberWithCommas(coin.current_price.toFixed(2))}
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: '600' }}>
                            {
                              coin.price_change_percentage_24h > 0
                                ? <span style={{ color: '#5bcf0e' }}>
                                  +{coin.price_change_percentage_24h.toFixed(2)}%
                                </span>
                                : <span style={{ color: '#eb2553' }}>
                                  {coin.price_change_percentage_24h.toFixed(2)}%
                                </span>
                            }
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: '400' }}>
                            {numberWithCommas(coin.total_volume)}
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: '400' }}>
                            <span style={{ marginRight: '0.1rem' }}>
                              {
                                typeof getSymbolFromCurrency(currency) === 'undefined'
                                  ? currency.toUpperCase()
                                  : getSymbolFromCurrency(currency)
                              }
                            </span>
                            {
                              coin.market_cap.toString().length > 6
                                ? `${numberWithCommas(coin.market_cap.toString().slice(0, -6))}M`
                                : numberWithCommas(coin.market_cap)
                            }
                          </TableCell>
                          <TableCell>
                            <CoinGraph {...coin} />
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </TableContainer>

              <Pagination count={Math.ceil(handleSearch().length / 10)} align="center" size='large' color="primary"
                sx={{ background: 'primary', marginTop: '2rem', display: 'flex', justifyContent: 'center' }} page={page}
                onChange={(event, index) => setPage(index)}
              />
            </>
            )
        }

      </Container>
    </>
  )
}

export default Content