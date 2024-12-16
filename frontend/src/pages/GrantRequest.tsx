import { CONFIG } from "@/config-global";
import RequestTable from "@/sections/grantRequest/RequestTable";
import React from "react";
import { Helmet } from "react-helmet-async";


export default function GrantRequest() {
  return (
    <>
      <Helmet>
        <title> {`Grat Request - ${CONFIG.appName}`}</title>
      </Helmet>
      
      <RequestTable></RequestTable>
    </>
  );
}
