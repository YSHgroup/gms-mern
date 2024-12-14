import { Container, Grid2 as Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

import { _tasks, _posts, _timeline } from '@/_mock';
import { DashboardContent } from '@/layouts/dashboard';
import WorkPanel from '@/sections/announcementPortal/workPanel';

// ----------------------------------------------------------------------

export default function AnnouncementPortal() {

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Announcement Portal
      </Typography>

      <Container className='bg-white border-solid border rounded border-stone-100 p-6'>
        <WorkPanel>

        </WorkPanel>
      </Container>
    </DashboardContent>
  );
}
