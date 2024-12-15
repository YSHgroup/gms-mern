import type { CardProps } from "@mui/material/Card";
import type { ColorType } from "@/theme/core/palette";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { useTheme } from "@mui/material/styles";

import { varAlpha, bgGradient } from "@/theme/styles";
import { Grid2, Stack } from "@mui/material";

// ----------------------------------------------------------------------

type Props = CardProps & {
  title: string;
  img?: string;
  color?: ColorType;
  text: string;
  date: string;
};

export function AnnouncementBox({
  title,
  img,
  date,
  color = "primary",
  sx,
  text,
  ...other
}: Props) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        ...bgGradient({
          color: `135deg, ${varAlpha(
            theme.vars.palette[color].lighterChannel,
            0.48
          )}, ${varAlpha(theme.vars.palette[color].lightChannel, 0.48)}`,
        }),
        p: 3,
        boxShadow: "none",
        position: "relative",
        color: `${color}.darker`,
        backgroundColor: "common.white",
        ...sx,
      }}
      {...other}
    >
      <Grid2 container spacing={2} justifyContent={'center'}>
        {/* <Grid2 size={{ lg: 4, xs: 12 }}>
          <Box sx={{ width: "100%", height: "100%", mb: 3 }}>
            <img src={img} alt={title} loading="lazy" className="" />
          </Box>
        </Grid2>

        <Grid2 size={{ lg: 8, xs: 12 }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <Box>{title}</Box>
            <Box sx={{ flexGrow: 1, minWidth: 112 }}>{text}</Box>
          </Box>
          <Box>{date}</Box>
        </Grid2> */}

        <Stack spacing={2} className="items-center">
          {img? (
            <Box
              sx={{
                width: { xs: "100%", sm: "70%", md: "40%" },
                height: "100%",
                mb: 3,
              }}
            >
              <img src={`${import.meta.env.VITE_BASE_URL}${img}`} alt={title} loading="lazy" className="" />
            </Box>
          ): <></>}

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <Box className="w-full text-xl font-semibold">{title}</Box>
            <Box className="w-full text-slate-900">Date: {date}</Box>
            <Box sx={{ flexGrow: 1, minWidth: 112 }}>{text}</Box>
          </Box>
        </Stack>
      </Grid2>
    </Card>
  );
}
