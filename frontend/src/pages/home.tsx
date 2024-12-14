import { Helmet } from 'react-helmet-async';

import { CONFIG } from '@/config-global';

import AnnouncementView from '@/sections/home/AnnouncementView'

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Dashboard - ${CONFIG.appName}`}</title>
        <meta
          name="description"
          content="Grant Website"
        />
        <meta name="keywords" content="grant,university,department" />
      </Helmet>

      <AnnouncementView />
    </>
  );
}
