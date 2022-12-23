import { Container, Toolbar, Typography } from '@mui/material'
import React from 'react'
import BannerCarousel from './BannerCarousel'

const Banner = () => {
    const styles = {
        banner: {
            backgroundImage: "url('/background.jpg')",
            backgroundSize: 'cover',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem 0'
        }
    }


    return (
        <div style={styles.banner}>
            <Container maxWidth="lg" disableGutters sx={{ marginBottom: '3rem' }}>
                <Toolbar sx={{ flexDirection: 'column' }}>
                    <Typography variant="h2" sx={{
                        color: '#fff', fontWeight: '700', textAlign: 'center',
                        lineHeight: '1', marginBottom: '1rem'
                    }} >
                        Crypto Tracker
                    </Typography>
                    <Typography variant="button" sx={{ color: '#b9b9bb', textAlign: 'center', }}>
                        Get All The Info Regarding Your Favorite Crypto Currency
                    </Typography>
                </Toolbar>
            </Container>
            <BannerCarousel />
        </div>
    )
}

export default Banner