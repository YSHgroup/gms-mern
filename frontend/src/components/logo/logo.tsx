import type { BoxProps } from "@mui/material/Box";

import { forwardRef } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { RouterLink } from "@/routes/components";
import { logoClasses } from "./classes";

import logo from "../../../public/small_logo.png";

// ----------------------------------------------------------------------

export type LogoProps = BoxProps & {
  href?: string;
  isSingle?: boolean;
  disableLink?: boolean;
};

const FullLogoContainer = styled(Box)({
  width: "100%",
  height: "80px",
  backgroundColor: "dodgerblue",
  padding: 5,
  color: "white",
  textAlign: "center",
});

const FullLogo = () => (
  <FullLogoContainer>
    <h1
      style={{
        margin: 0,
        borderBottom: "1px solid blue",
        fontFamily: "ui-monospace",
      }}
    >
      KUE
    </h1>
    <h4
      style={{
        margin: 0,
        color: "lightcyan",
        fontStyle: "italic",
        fontFamily: "cursive",
      }}
    >
      Grant Management System
    </h4>
  </FullLogoContainer>
);

export const Logo = forwardRef<HTMLDivElement, LogoProps>(
  (
    {
      width,
      href = "/",
      height,
      isSingle = true,
      disableLink = false,
      className,
      sx,
      ...other
    },
    ref
  ) => {
    const baseSize = {
      width: width ?? "100%",
      height: height ?? 80,
      ...(!isSingle && {
        width: width ?? 60,
        height: height ?? 60,
      }),
    };

    return (
      <Box
        ref={ref}
        component={RouterLink}
        href={href}
        className={logoClasses.root.concat(className ? ` ${className}` : "")}
        aria-label="Logo"
        sx={{
          ...baseSize,
          flexShrink: 0,
          textDecoration: "none",
          display: "inline-flex",
          verticalAlign: "middle",
          ...(disableLink && { pointerEvents: "none" }),
          ...sx,
        }}
        {...other}
      >
        {!isSingle ? (
          <img src={logo} width={60} height={60} alt="logo" />
        ) : (
          <FullLogo />
        )}
      </Box>
    );
  }
);
