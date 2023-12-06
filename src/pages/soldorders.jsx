import { Helmet } from 'react-helmet-async';

import { SoldorderView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function SoldOrders() {
  return (
    <>
      <Helmet>
        <title> User | Sold Orders </title>
      </Helmet>

      <SoldorderView />
    </>
  );
}
