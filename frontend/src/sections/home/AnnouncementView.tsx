import React from "react";

import { Grid2 as Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

import { _tasks, _posts, _timeline } from "@/_mock";
import { DashboardContent } from "@/layouts/dashboard";
import { AnnouncementBox } from "./parts/announcementBox";

import { getAnnouncements } from "@/services/announcementServices";
import { Announcement } from "@/types/announcement";

import text from "./parts/mockText.json";

// ----------------------------------------------------------------------

export default function AnnouncementView() {
  const [announcements, setAnnouncements] = React.useState<Announcement[]>();

  React.useEffect(() => {
    getAnnouncements()
      .then((res) => {
        console.log('Announcements fetched:', res.data);
        setAnnouncements(res.data)})
      .catch((err) => console.error('Error fetching announcements:', err));
  }, []);

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid size={12}>
          {
            announcements?.length === 0? (
              <Typography>No announcements available.</Typography>
            ) : (
              announcements?.map((ann) => (
                <AnnouncementBox
                  key={ann._id}
                  className="my-4"
                  title={ann.title}
                  img={ann.imageUrl}
                  text={ann.content}
                  from={ann.from}
                  until={ann.until}
                />
              ))
            )
          }
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
