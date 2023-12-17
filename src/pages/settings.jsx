import { Helmet } from 'react-helmet-async';

import { SettingsView } from 'src/sections/settings';

// ----------------------------------------------------------------------

export default function SettingsPage() {
  return (
    <>
      <Helmet>
        <title> Settings</title>
      </Helmet>

      <SettingsView/>
    </>
  );
}
