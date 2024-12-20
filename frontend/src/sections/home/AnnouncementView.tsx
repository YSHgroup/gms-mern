import React, { useRef } from "react";

import { Grid2 as Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

import { DashboardContent } from "@/layouts/dashboard";
import { AnnouncementBox } from "./parts/announcementBox";

import { getAnnouncements } from "@/services/announcementServices";
import { Announcement } from "@/types/announcement";

// ----------------------------------------------------------------------

export default function AnnouncementView() {
  const [announcements, setAnnouncements] = React.useState<Announcement[]>();
  const viewRef = useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    getAnnouncements()
      .then((res) => {
        setAnnouncements(res.data)})
      .catch((err) => console.error('Error fetching announcements:', err));
  }, []);

  React.useEffect(() => {
    if(viewRef?.current) {
      viewRef.current.lastElementChild?.scrollIntoView();
    }
  }, [announcements])

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid size={12}>
        <div ref={viewRef}>
          {
            announcements?.length === 0? (
              <Typography>No announcements available.</Typography>
            ) : (
              announcements?.map((ann: Announcement) => (
                <AnnouncementBox
                  key={ann._id}
                  announcement={ann}
                />
              ))
            )
          }
          </div>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
