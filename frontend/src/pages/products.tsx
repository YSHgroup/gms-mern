import { Helmet } from 'react-helmet-async';

import { CONFIG } from '@/config-global';

import { ProductsView } from '@/sections/product/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Products - ${CONFIG.appName}`}</title>
      </Helmet>

      <ProductsView />
    </>
  );
}
