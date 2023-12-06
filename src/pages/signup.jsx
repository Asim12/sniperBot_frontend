import { Helmet } from 'react-helmet-async';

import { SignUpView } from 'src/sections/login';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> SignUp | Snipper </title>
      </Helmet>

      <SignUpView />
    </>
  );
}
