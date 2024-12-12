import { Helmet } from 'react-helmet-async';

import { CONFIG } from '@/config-global';

import RequestView from '@/components/regRequest/RegisterRequestView';

// ----------------------------------------------------------------------

export default function RegisterRequest() {
    
  return (
    <>
      <Helmet>
        <title> {`Request - ${CONFIG.appName}`}</title>
      </Helmet>

      <RequestView />
    </>
  );
}
