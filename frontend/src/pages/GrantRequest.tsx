import { CONFIG } from "@/config-global";
import React from "react";
import { Helmet } from "react-helmet-async";

type Props = {};

export default function GrantRequest({}: Props) {
  return (
    <>
      <Helmet>
        <title> {`Grat Request - ${CONFIG.appName}`}</title>
      </Helmet>

      
    </>
  );
}
