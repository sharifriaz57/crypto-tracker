import { Container, IconButton, Link } from '@mui/material'
import React from 'react'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@emotion/react';
import { ColorContext, CurrencyContext } from '../../context/ColorModeContext';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { coinListAPI } from '../../api/api';

const Header = () => {
  const theme = useTheme();
  const { colorMode } = ColorContext();
  const { currency, handleCurrency } = CurrencyContext();
  const [allCurrency, setAllCurrency] = React.useState([]);

  const getCoinList = async () => {
    const { data } = await axios.get(coinListAPI());
    setAllCurrency(data);
  }

  React.useEffect(() => {
    getCoinList()
  }, [])

  const styles = {
    currencySelect: {
      minWidth: 150,
      '@media (max-width:640px)': {
        minWidth: 115,
      }
    }
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, position: 'relative', zIndex: '5' }}>
        <AppBar position="static"
          sx={{
            bgcolor: 'background.default'
          }}
        >
          <Container maxWidth="lg" disableGutters>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Link href="/" underline="none">
                <Typography variant="h5" component="div"
                  sx={{ color: 'divider', fontWeight: '800' }}>
                  Cryto Tracker
                </Typography>
              </Link>

              <div style={{ display: 'flex' }}>
                <Autocomplete
                  id="country-select-demo"
                  value={currency}
                  onChange={(event, newValue) => {
                    newValue === null ? handleCurrency('usd') : handleCurrency(newValue)
                  }}
                  sx={{ ...styles.currencySelect }}
                  options={allCurrency}
                  autoHighlight
                  getOptionLabel={(option) => option.toUpperCase()}
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      {option.toUpperCase()}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: '',
                      }}
                    />
                  )}
                  size="small"
                />

                <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                  {theme.palette.mode === 'dark' ? <Brightness7Icon sx={{ color: 'text.primary' }} /> : <Brightness4Icon sx={{ color: 'text.primary' }} />}
                </IconButton>
              </div>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  )
}

export default Header
