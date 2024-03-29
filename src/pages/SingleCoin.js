import React from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import { SingleCoinAPI } from '../api/api';
import SingleCoinInfo from '../components/content/SingleCoinInfo';

const SingleCoin = () => {
  const { id } = useParams();
  const [coinInfo, setCoinInfo] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const getCoinsByMarketCap = React.useCallback(async () => {
    setLoading(true)
    const { data } = await axios.get(SingleCoinAPI(id));
    setCoinInfo(data);
    setLoading(false);
  }, [id])

  React.useEffect(() => {
    getCoinsByMarketCap();
  }, [getCoinsByMarketCap, id])

  return (
    <>
      {
        loading
          ? <LinearProgress color="primary" />
          : <SingleCoinInfo {...coinInfo} />
      }
    </>
  )
}

export default SingleCoin