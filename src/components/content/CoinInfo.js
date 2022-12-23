import React from 'react';
import { Divider, Typography } from '@mui/material';
import getSymbolFromCurrency from 'currency-symbol-map';
import { CurrencyContext } from '../../context/ColorModeContext';
import { numberWithCommas } from '../banner/BannerCarousel';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import parse from 'html-react-parser';

const CoinInfo = (props) => {
	const { currency } = CurrencyContext();
	const { id, name, symbol, description, image, market_data } = props;

	return (
		<>
			<div style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
				<img src={image?.large} alt={id} style={{ maxWidth: '100px' }} />
			</div>

			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '0.5rem' }}>
				<Typography variant="h5" sx={{ marginRight: '0.5rem', fontSize: '1.25rem', fontWeight: 600, lineHeight: '1', color: 'text.primary' }}>
					{name}
				</Typography>
				<Typography variant="body2" sx={{ color: 'text.secondary', textTransform: 'uppercase' }}>
					({symbol})
				</Typography>
			</div>

			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '0.5rem' }}>
				<Typography variant="h5" sx={{ fontWeight: '600', fontSize: '1.75rem', marginRight: '0.2rem', color: 'text.primary' }}>
					{
						typeof getSymbolFromCurrency(currency) === 'undefined'
							? currency.toUpperCase()
							: getSymbolFromCurrency(currency)
					}
				</Typography>

				<Typography variant="h5" sx={{ fontWeight: '700', color: 'text.primary', fontSize: '1.75rem', marginRight: '0.5rem' }}>
					{market_data && numberWithCommas(market_data.current_price[currency])}
				</Typography>

				{
					market_data && (market_data.price_change_percentage_24h > 0 || market_data.price_change_percentage_24h === 0)
						? <>
							<TrendingUpIcon sx={{ marginRight: '0.1rem', color: '#11c426' }} />
							<Typography variant="subtitle1" sx={{ fontWeight: '600', fontSize: '1.1rem', color: '#11c426' }}>
								{market_data?.price_change_percentage_24h.toFixed(2)}%
							</Typography>
						</>
						: <>
							<TrendingDownIcon sx={{ marginRight: '0.1rem', color: '#d90303', trnasform: 'rotateX(180deg)' }} />
							<Typography variant="subtitle1" sx={{ fontWeight: '700', color: '#d90303' }}>
								{Math.abs(market_data?.price_change_percentage_24h.toFixed(2))}%
							</Typography>
						</>
				}
			</div>

			<Typography variant="body2" sx={{ marginTop: '1.5rem' }}>
				{description && parse(description.en.split('. ').splice(0, 2).join('. '))}.
			</Typography>

			<div style={{ marginTop: '1.5rem' }}>
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
					<Typography variant="body2" color='text.secondary'>
						Rank
					</Typography>

					<Typography variant="body2" color='text.primary' sx={{ fontWeight: '600' }}>
						# {market_data?.market_cap_rank}
					</Typography>
				</div>

				<Divider sx={{ borderColor: 'text.secondary' }} />

				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
					<Typography variant="body2" color='text.secondary'>
						Market Cap
					</Typography>

					<div style={{ display: 'flex' }}>
						<Typography variant="body2" sx={{ fontWeight: '400', marginRight: '0.1rem', color: 'text.primary' }}>
							{
								typeof getSymbolFromCurrency(currency) === 'undefined'
									? currency.toUpperCase()
									: getSymbolFromCurrency(currency)
							}
						</Typography>

						<Typography variant="body2" color='text.primary' sx={{ fontWeight: '600' }}>
							{market_data && numberWithCommas(market_data.market_cap[currency].toString().slice(0, -6))} M
						</Typography>
					</div>
				</div>

				<Divider sx={{ borderColor: 'text.secondary' }} />

				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
					<Typography variant="body2" color='text.secondary'>
						24 Hr. Trading Volume
					</Typography>

					<div style={{ display: 'flex' }}>
						<Typography variant="body2" sx={{ fontWeight: '400', marginRight: '0.1rem', color: 'text.primary' }}>
							{
								typeof getSymbolFromCurrency(currency) === 'undefined'
									? currency.toUpperCase()
									: getSymbolFromCurrency(currency)
							}
						</Typography>

						<Typography variant="body2" color='text.primary' sx={{ fontWeight: '600' }}>
							{market_data && market_data.total_volume && numberWithCommas(market_data.total_volume[currency].toString().slice(0, -6))} M
						</Typography>
					</div>
				</div>

				<Divider sx={{ borderColor: 'text.secondary' }} />

				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
					<Typography variant="body2" color='text.secondary'>
						Fully Diluted Valution
					</Typography>

					<div style={{ display: 'flex' }}>
						<Typography variant="body2" sx={{ fontWeight: '400', marginRight: '0.1rem', color: 'text.primary' }}>
							{
								market_data && market_data.fully_diluted_valuation[currency]
									? typeof getSymbolFromCurrency(currency) !== 'undefined'
										? getSymbolFromCurrency(currency)
										: currency.toUpperCase()
									: ''
							}
						</Typography>

						<Typography variant="body2" color='text.primary' sx={{ fontWeight: '600' }}>
							{market_data && market_data.fully_diluted_valuation[currency]
								? `${numberWithCommas(market_data.fully_diluted_valuation[currency].toString().slice(0, -6))} M`
								: parse('&infin;')
							}
						</Typography>
					</div>
				</div>

				<Divider sx={{ borderColor: 'text.secondary' }} />

				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
					<Typography variant="body2" color='text.secondary'>
						Total Supply
					</Typography>

					<Typography variant="body2" color='text.primary' sx={{ fontWeight: '600' }}>
						{market_data && market_data.total_supply
							? numberWithCommas(market_data.total_supply.toFixed(2))
							: parse('&infin;')
						}
					</Typography>
				</div>
			</div>
		</>
	)
}

export default CoinInfo