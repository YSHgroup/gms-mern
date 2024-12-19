import type { CardProps } from "@mui/material/Card";
import type { ColorType } from "@/theme/core/palette";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { useTheme } from "@mui/material/styles";

import {
  Button,
  CardContent,
  CardMedia,
  Grid2,
  Typography,
} from "@mui/material";
import { useRouter } from "@/routes/hooks";
import { Announcement } from "@/types/announcement";
import { currencyTypes } from "@/constants/currencyType";
import { getCurrentUser } from "@/services/authService";

// ----------------------------------------------------------------------

export function AnnouncementBox({announcement}: {announcement: Announcement}) {
  const {
    _id,
    title,
    imageUrl,
    from,
    until,
    content,
    budget,
    currencyType
  } = announcement
  const timestampOfUntil = new Date(until).getTime();
  const theme = useTheme();
  const router = useRouter()
  const user = getCurrentUser()

  const applyForAnnouncement = () => {
    router.push('/apply/'+ _id)
  }
  return (
    <Card
      className="mb-5"
      sx={{
        display: "flex",
        [theme.breakpoints.down("md")]: {
          display: "block",
        },
      }}
      elevation={4}
    >
      <CardMedia
        component="img"
        sx={{
          width: {
            xs: "100%",
            md: "50%",
            lg: "40%",
            xl: "35%",
          },
        }}
        image={`${import.meta.env.VITE_BASE_URL}/${imageUrl}`}
        alt={title}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography className="w-full text-xl font-semibold" variant="h4">
            {title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <Grid2
              container
              className="w-full text-slate-900"
            >
              <Grid2 size={{ md: 12, lg: 6, xl: 5 }}>
                <span className="text-sky-600">Period : </span> <span  className="whitespace-nowrap">{from}</span> ~ <span className="whitespace-nowrap">{until}</span>
              </Grid2>
              <Grid2 size={{ md: 12, lg: 6, xl: 5 }}>
              <span className="text-sky-600">Budget : </span> {budget?.toLocaleString()} {currencyTypes.filter(cur => cur.value == currencyType)[0]?.label}
              </Grid2>
            </Grid2>

            {timestampOfUntil < Date.now() && (
              <Box className="w-full text-red-700" color={"error"}>
                Expired
              </Box>
            )}

            <Box sx={{ flexGrow: 1, minWidth: 112 }}>{content}</Box>
          </Box>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pl: 1,
            pb: 1,
          }}
        >
          {(timestampOfUntil > Date.now() && user.role === 'user')  && (
            <Button size="large" onClick={applyForAnnouncement}>Apply</Button>
          )}
        </Box>
      </Box>
    </Card>

    // <Card
    //   sx={{
    //     ...bgGradient({
    //       color: `135deg, ${varAlpha(
    //         theme.vars.palette[color].lighterChannel,
    //         0.48
    //       )}, ${varAlpha(theme.vars.palette[color].lightChannel, 0.48)}`,
    //     }),
    //     p: 3,
    //     boxShadow: "none",
    //     position: "relative",
    //     color: `${color}.darker`,
    //     backgroundColor: "common.white",
    //     ...sx,
    //   }}
    //   {...other}
    // >
    //   <Grid2 container spacing={2} justifyContent={"center"}>
    //     {/* <Grid2 size={{ lg: 4, xs: 12 }}>
    //       <Box sx={{ width: "100%", height: "100%", mb: 3 }}>
    //         <img src={img} alt={title} loading="lazy" className="" />
    //       </Box>
    //     </Grid2>

    //     <Grid2 size={{ lg: 8, xs: 12 }}>
    //       <Box
    //         sx={{
    //           display: "flex",
    //           flexWrap: "wrap",
    //           alignItems: "flex-end",
    //           justifyContent: "center",
    //         }}
    //       >
    //         <Box>{title}</Box>
    //         <Box sx={{ flexGrow: 1, minWidth: 112 }}>{text}</Box>
    //       </Box>
    //       <Box>{date}</Box>
    //     </Grid2> */}

    //     <Stack spacing={2} className="items-center">
    //       {img ? (
    //         <Box
    //           sx={{
    //             width: { xs: "100%", sm: "70%", md: "40%" },
    //             height: "100%",
    //             mb: 3,
    //           }}
    //         >
    //           <img
    //             src={`${import.meta.env.VITE_BASE_URL}/${img}`}
    //             alt={title}
    //             loading="lazy"
    //             className=""
    //           />
    //         </Box>
    //       ) : (
    //         <></>
    //       )}

    //       <Box
    //         sx={{
    //           display: "flex",
    //           flexWrap: "wrap",
    //           alignItems: "flex-end",
    //           justifyContent: "center",
    //         }}
    //       >
    //         <Box className="w-full text-xl font-semibold">{title}</Box>
    //         {timestampOfUntil < Date.now() ? (
    //           <Box className="w-full text-red-700" color={"error"}>
    //             Expired
    //           </Box>
    //         ) : (
    //           <Box className="w-full text-slate-900">
    //             From: <span>{`${from} Until: ${until}`}</span>
    //           </Box>
    //         )}

    //         <Box sx={{ flexGrow: 1, minWidth: 112 }}>{text}</Box>
    //       </Box>
    //     </Stack>
    //   </Grid2>
    // </Card>
  );
}
