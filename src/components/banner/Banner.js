import { Container, Toolbar, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import { ColorContext } from '../../context/ColorModeContext';
import BannerCarousel from './BannerCarousel';

const Banner = () => {
    const { mode } = ColorContext();
    const tabletDevice = useMediaQuery('(max-width: 768px)');

    const styles = {
        banner: {
            backgroundColor: `${mode === 'light' ? '#8ddcf5' : '#25203b'}`,
            backgroundSize: 'cover',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem 0',
            position: 'relative'
        },
        svg: {
            position: 'absolute',
            top: '12%',
            maxWidth: `${tabletDevice ? '20vw' : '14vw'}`,
            height: 'auto',
            opacity: '0.41',
        }
    }

    return (
        <>
            <div style={styles.banner} >
                <svg width="100%" height="100%" version="1.1" fillRule="evenodd" clipRule="evenodd" style={{...styles.svg, left: `${tabletDevice ? 0 : '10%'}` }}
                    viewBox="0 0 4091.27 4091.73">
                    <g id="Layer_x0020_1">
                        <g id="_1421344023328">
                            <path fill={`${mode === 'light' ? '#00bcd4' : '#3f51b5'}`} fillRule="nonzero" d="M4030.06 2540.77c-273.24,1096.01 -1383.32,1763.02 -2479.46,1489.71 -1095.68,-273.24 -1762.69,-1383.39 -1489.33,-2479.31 273.12,-1096.13 1383.2,-1763.19 2479,-1489.95 1096.06,273.24 1763.03,1383.51 1489.76,2479.57l0.02 -0.02z" />
                            <path fill="white" fillRule="nonzero" d="M2947.77 1754.38c40.72,-272.26 -166.56,-418.61 -450,-516.24l91.95 -368.8 -224.5 -55.94 -89.51 359.09c-59.02,-14.72 -119.63,-28.59 -179.87,-42.34l90.16 -361.46 -224.36 -55.94 -92 368.68c-48.84,-11.12 -96.81,-22.11 -143.35,-33.69l0.26 -1.16 -309.59 -77.31 -59.72 239.78c0,0 166.56,38.18 163.05,40.53 90.91,22.69 107.35,82.87 104.62,130.57l-104.74 420.15c6.26,1.59 14.38,3.89 23.34,7.49 -7.49,-1.86 -15.46,-3.89 -23.73,-5.87l-146.81 588.57c-11.11,27.62 -39.31,69.07 -102.87,53.33 2.25,3.26 -163.17,-40.72 -163.17,-40.72l-111.46 256.98 292.15 72.83c54.35,13.63 107.61,27.89 160.06,41.3l-92.9 373.03 224.24 55.94 92 -369.07c61.26,16.63 120.71,31.97 178.91,46.43l-91.69 367.33 224.51 55.94 92.89 -372.33c382.82,72.45 670.67,43.24 791.83,-303.02 97.63,-278.78 -4.86,-439.58 -206.26,-544.44 146.69,-33.83 257.18,-130.31 286.64,-329.61l-0.07 -0.05zm-512.93 719.26c-69.38,278.78 -538.76,128.08 -690.94,90.29l123.28 -494.2c152.17,37.99 640.17,113.17 567.67,403.91zm69.43 -723.3c-63.29,253.58 -453.96,124.75 -580.69,93.16l111.77 -448.21c126.73,31.59 534.85,90.55 468.94,355.05l-0.02 0z" />
                        </g>
                    </g>
                </svg>

                <svg width="100%" height="100%" version="1.1" fillRule="evenodd" clipRule="evenodd" style={{...styles.svg, right: `${tabletDevice ? 0 : '10%'}`}}
                    viewBox="0 0 784.37 1277.39">
                    <g id="Layer_x0020_1">
                        <g id="_1421394342400">
                            <g>
                                <polygon fill={`${mode === 'light' ? '#00bcd4' : '#2f3195'}`} fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 " />
                                <polygon fill={`${mode === 'light' ? '#00bcd4' : '#3f51b5'}`} fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 " />
                                <polygon fill={`${mode === 'light' ? '#00bcd4' : '#2f3195'}`} fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 " />
                                <polygon fill={`${mode === 'light' ? '#00bcd4' : '#3f51b5'}`} fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89 " />
                                <polygon fill="white" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33 " />
                                <polygon fill="white" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33 " />
                            </g>
                        </g>
                    </g>
                </svg>

                <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 2496 2496" style={{...styles.svg, right: '25%', top: '-20px' }}>
                    <g>
                        <path fill={`${mode === 'light' ? '#00bcd4' : '#3f51b5'}`} d="M1248,0c689.3,0,1248,558.7,1248,1248s-558.7,1248-1248,1248
                            S0,1937.3,0,1248S558.7,0,1248,0L1248,0z"/>
                        <path fill="#FFFFFF" d="M685.9,1248l0.9,330l280.4,165v193.2l-444.5-260.7v-524L685.9,1248L685.9,1248z M685.9,918v192.3
                            l-163.3-96.6V821.4l163.3-96.6l164.1,96.6L685.9,918L685.9,918z M1084.3,821.4l163.3-96.6l164.1,96.6L1247.6,918L1084.3,821.4
                            L1084.3,821.4z"/>
                        <path fill="#FFFFFF" d="M803.9,1509.6v-193.2l163.3,96.6v192.3L803.9,1509.6L803.9,1509.6z M1084.3,1812.2l163.3,96.6
                            l164.1-96.6v192.3l-164.1,96.6l-163.3-96.6V1812.2L1084.3,1812.2z M1645.9,821.4l163.3-96.6l164.1,96.6v192.3l-164.1,96.6V918
                            L1645.9,821.4L1645.9,821.4L1645.9,821.4z M1809.2,1578l0.9-330l163.3-96.6v524l-444.5,260.7v-193.2L1809.2,1578L1809.2,1578
                            L1809.2,1578z"/>
                        <polygon fill="#FFFFFF" points="1692.1,1509.6 1528.8,1605.3 1528.8,1413 1692.1,1316.4 1692.1,1509.6 	" />
                        <path fill="#FFFFFF" d="M1692.1,986.4l0.9,193.2l-281.2,165v330.8l-163.3,95.7l-163.3-95.7v-330.8l-281.2-165V986.4
                            L968,889.8l279.5,165.8l281.2-165.8l164.1,96.6H1692.1L1692.1,986.4z M803.9,656.5l443.7-261.6l444.5,261.6l-163.3,96.6
                            l-281.2-165.8L967.2,753.1L803.9,656.5L803.9,656.5z"/>
                    </g>
                </svg>

                <Container maxWidth="lg" disableGutters sx={{ marginBottom: '3rem' }}>
                    <Toolbar sx={{ flexDirection: 'column' }}>
                        <Typography variant="h2" sx={{
                            color: 'text.primary', fontWeight: '700', textAlign: 'center',
                            lineHeight: '1', marginBottom: '1rem'
                        }} >
                            Crypto Tracker
                        </Typography>
                        <Typography variant="button" sx={{ color: 'text.primary', textAlign: 'center', }}>
                            Get All The Info Regarding Your Favorite Crypto Currency
                        </Typography>
                    </Toolbar>
                </Container>
                <BannerCarousel />
            </div>
        </>
    )
}

export default Banner