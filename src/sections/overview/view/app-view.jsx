import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';
import axios from 'axios';
import LineChart from 'src/routes/components/LineChart';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getOpenBalanceGraphData, getProfitBalanceGraphData, getSellBalanceGraphData } from 'src/redux/action';
// ----------------------------------------------------------------------

export default function AppView() {
  const dispatch=useDispatch()
  const [balances,setBalances]=useState([])
  const graphState=useSelector(state=>state.graph);
  const orderState=useSelector(state=>state.order);
  console.log("🚀 ~ file: app-view.jsx:31 ~ AppView ~ orderState:", orderState)

  console.log('balances',balances)

const graphLabel = ['Open Order Graph','Sold Order Graph','Profit Order Graph']

  useEffect(()=>{
    dispatch(getOpenBalanceGraphData())
    dispatch(getSellBalanceGraphData())
    dispatch(getProfitBalanceGraphData())


    const getBalances=async()=> {
      try {
        const token = localStorage.getItem('token'); // Assuming your user slice has a 'token' field
        const response = await axios.get('http://localhost:3000/api/balance', {
          headers: {
            'x-access-token': token,
          },
        });
        setBalances(response?.data)
        return response.data;
      } catch (error) {
        console.log(error)
      }
    }

    getBalances()
  },[])
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Current "
            total={` $${balances?.balance?.current_coin_balance?balances?.balance?.current_coin_balance:0}`}
            color="success"
            icon={<img alt="icon" src="/assets/icons/price.jpg" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Buy "
            total={`$${balances?.balance?.buy_order_balance?balances?.balance?.buy_order_balance:null}`}
            color="info"
            icon={<img alt="icon" src="/assets/icons/priceOne.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Sold "
            total={`$${balances?.balance?.sell_order_balance?balances?.balance?.sell_order_balance:0}`}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/sold.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Profit"
            total={`$${balances?.balance?.profit_balance?balances?.balance?.profit_balance:0}`}
            color="error"
            icon={<img alt="icon" src="/assets/icons/profit.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <LineChart graphLabel={graphLabel[0]} graphData={graphState?.openBalanceGraphData?.getBuyOrderGraph} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Current Visits"
            chart={{
              series: [
                { label: 'Current', value: balances?.balance?.buy_order_balance?balances?.balance?.buy_order_balance:0},
                { label: 'Buy', value: balances?.balance?.buy_order_balance? balances?.balance?.buy_order_balance:0 },
                { label: 'Sold', value: balances?.balance?.sell_order_balance?balances?.balance?.sell_order_balance:0 },
                { label: 'Profit', value: balances?.balance?.profit_balance?balances?.balance?.profit_balance:0 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={12} lg={12}>
         <LineChart graphLabel={graphLabel[1]} graphData={graphState?.sellBalanceGraphData?.getSellOrderGraph}/>
        </Grid>

       


        <Grid xs={12} md={12} lg={12}>
         <LineChart graphLabel={graphLabel[2]} graphData={graphState?.profitBalanceGraphData?.getProfit_graph
}/>
        </Grid>

        {/* <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid> */}
      </Grid>
    </Container>
  );
}
