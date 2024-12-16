import { Helmet } from 'react-helmet-async';

import { CONFIG } from '@/config-global';
import ApplySection from '@/sections/apply/AppySection';



// ----------------------------------------------------------------------

export default function Apply() {

  return (
    <>
      <Helmet>
        <title> {`Apply - ${CONFIG.appName}`}</title>
      </Helmet>

      <ApplySection></ApplySection>
    </>
  );
}
