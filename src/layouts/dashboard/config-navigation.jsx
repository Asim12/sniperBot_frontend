import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },


  {
    title: 'Buy Orders',
    path: '/buy-orders',
    icon: icon('ic_cart'),
  },

  {
    title: 'Sold Orders',
    path: '/sold-orders',
    icon: icon('ic_cart'),
  },


  {
    title: 'Custom Orders',
    path: '/custom-orders',
    icon: icon('ic_cart'),
  },
  

];

export default navConfig;
