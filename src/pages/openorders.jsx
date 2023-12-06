import { Helmet } from 'react-helmet-async';

import { OpenorderView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function OpenOrders() {
  return (
    <>
      <Helmet>
        <title> User | Open Orders </title>
      </Helmet>

      <OpenorderView />
    </>
  );
}
