import { Helmet } from 'react-helmet-async';
import { BuyOrdersView } from 'src/sections/buy-orders/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

    <BuyOrdersView/>
    </>
  );
}
