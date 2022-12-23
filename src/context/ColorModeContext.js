import { createTheme, ThemeProvider } from '@mui/material';
import { grey, indigo, cyan } from '@mui/material/colors';
import React from 'react';

export const ColorModeContextAPI = React.createContext({ toggleColorMode: () => { } });
export const CurrentCurrencyContextAPI = React.createContext();

const ColorModeContext = ({ children }) => {
    const [mode, setMode] = React.useState('dark');
    const [currency, setCurrency] = React.useState('usd');

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const handleCurrency = (currency) => {
        setCurrency(currency);
    }

    const getDesignTokens = (mode) => ({
        typography: {
            fontFamily: 'Open Sans, sans-serif'
        },
        palette: {
            mode,
            ...(mode === 'light'
                ? {
                    // palette values for light mode
                    primary: indigo,
                    divider: indigo[500],
                    background: {
                        default: grey[100],
                        paper: grey[100],
                    },
                    text: {
                        primary: grey[900],
                        secondary: grey[600],
                    },
                }
                : {
                    // palette values for dark mode
                    primary: cyan,
                    divider: cyan[500],
                    background: {
                        default: grey[900],
                        paper: grey[600],
                    },
                    text: {
                        primary: '#fff',
                        secondary: grey[500],
                    },
                }),
        },
    });

    const theme = React.useMemo(
        () =>
            createTheme(getDesignTokens(mode)),
        [mode],
    );

    return (
        <ColorModeContextAPI.Provider value={{ colorMode, mode }}>
            <CurrentCurrencyContextAPI.Provider value={{ currency, handleCurrency }}>
                <ThemeProvider theme={theme}>
                    {children}
                </ThemeProvider>
            </CurrentCurrencyContextAPI.Provider>
        </ColorModeContextAPI.Provider>
    );
}

export default ColorModeContext

export const ColorContext = () => {
    return React.useContext(ColorModeContextAPI);
} 
export const CurrencyContext = () => {
    return React.useContext(CurrentCurrencyContextAPI);
} 