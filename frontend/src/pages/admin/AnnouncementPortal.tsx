import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";

import { _tasks, _posts, _timeline } from "@/_mock";
import { DashboardContent } from "@/layouts/dashboard";
import WorkPanel from "@/sections/announcementPortal/workPanel";
import { Helmet } from "react-helmet-async";
import { CONFIG } from "@/config-global";

// ----------------------------------------------------------------------

export default function AnnouncementPortal() {
  return (
    <>
      <Helmet>
        <title> {`Announcement Portal - ${CONFIG.appName}`}</title>
      </Helmet>
      
      <DashboardContent maxWidth="xl">
        <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
          Announcement Portal
        </Typography>

        <Container className="bg-white border-solid border rounded border-stone-100 p-6">
          <WorkPanel></WorkPanel>
        </Container>
      </DashboardContent>
    </>
  );
}
