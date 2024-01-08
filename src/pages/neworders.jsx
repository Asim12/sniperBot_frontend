import { Helmet } from 'react-helmet-async';
import { NewOrdersView } from 'src/sections/new-orders/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <NewOrdersView/>
    </>
  );
}
