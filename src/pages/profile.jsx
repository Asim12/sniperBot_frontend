import { Helmet } from 'react-helmet-async';

import { ProfileView } from 'src/sections/profile';
// ----------------------------------------------------------------------

export default function SignupPage() {
  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>

       <ProfileView/>
    </>
  );
}