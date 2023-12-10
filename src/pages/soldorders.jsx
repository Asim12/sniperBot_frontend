import { Helmet } from 'react-helmet-async';
import { SoldOrdersView } from 'src/sections/orders/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <SoldOrdersView/>
    </>
  );
}
