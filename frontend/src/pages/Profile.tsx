import { Helmet } from 'react-helmet-async';

import { CONFIG } from '@/config-global';
import ProfileView from '@/sections/profile/ProfileView';


// ----------------------------------------------------------------------

export default function RegisterRequest() {

  return (
    <>
      <Helmet>
        <title> {`Profile - ${CONFIG.appName}`}</title>
      </Helmet>

      <ProfileView></ProfileView>
    </>
  );
}
