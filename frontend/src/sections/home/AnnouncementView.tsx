import { Grid2 as Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

import { _tasks, _posts, _timeline } from '@/_mock';
import { DashboardContent } from '@/layouts/dashboard';
import { AnnouncementBox } from './parts/announcementBox';

import img from '../../../public/img(3).webp'

// ----------------------------------------------------------------------

export default function AnnouncementView() {

  const text = 'These users can log into their account using their unique institute email id as username and their own password. These users can access (read) their own database only. They can enter a new grant request but can’t make changes in older one. If they want to make change, they will have to cancel the previous grant till it is pending and request for a new one. Limits on request will be there based on the roles.'

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid size={12}>
          <AnnouncementBox
          title="Announcement"
          img={img}
          text={text}
          date='2024-12-10'
          ></AnnouncementBox>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
