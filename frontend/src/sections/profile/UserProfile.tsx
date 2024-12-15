import { Iconify } from "@/components/iconify";
import { fetchUserInfo } from "@/services/userService";
import { User } from "@/types/userInfo";
import { Check, Close } from "@mui/icons-material";
import {
  Button,
  Grid2 as Grid,
  InputAdornment,
  TextField,
  Link,
  Typography,
} from "@mui/material";
import React from "react";
import { PasswordDialog } from "./PasswordDialog";

export default function UserProfile({ user }: { user?: User }) {
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
    setEmail(user?.email || "");
  }, [user]);

  return (
    <Grid container spacing={3}>
      <Grid size={{ sm: 6, xs: 12 }}>
        <TextField
          label="First Name"
          name="first_name"
          variant="outlined"
          value={firstName}
          onChange={(e) =>
            setFirstName(() => e.target.value)
          }
          fullWidth
        ></TextField>
      </Grid>

      <Grid size={{ sm: 6, xs: 12 }}>
        <TextField
          label="Last Name"
          name="last_name"
          variant="outlined"
          value={lastName}
          onChange={(e) =>
            setLastName(e.target.value)
          }
          fullWidth
        ></TextField>
      </Grid>

      <Grid size={{ md: 8, xs: 12 }}>
        <TextField
          label="Email"
          name="email"
          type="email"
          variant="standard"
          fullWidth
          disabled
          value={user?.email}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Iconify icon={"solar:lock-keyhole-bold"} />
                </InputAdornment>
              ),
            },
          }}
        ></TextField>
      </Grid>

      <Grid size={{ sm: 8, xs: 12 }}>
        <TextField
          label="Department"
          name="department"
          variant="standard"
          fullWidth
          disabled
          value={user?.department}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Iconify icon={"solar:lock-keyhole-bold"} />
                </InputAdornment>
              ),
            },
          }}
        ></TextField>
      </Grid>

      <Grid size={{ sm: 4, xs: 12 }}>
        <TextField
          label="Role"
          name="role"
          variant="standard"
          fullWidth
          disabled
          
          value={user?.role}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Iconify icon={"solar:lock-keyhole-bold"} />
                </InputAdornment>
              ),
            },
          }}
        ></TextField>
      </Grid>

      <Grid size={12}>
        <Typography
          variant="body1"
          color="primary"
          component={'span'}
          className="cursor-pointer hover:underline"
          onClick={() => setOpenDialog((pre) => !pre)}
        >
          Change Password
        </Typography>
      </Grid>

      <PasswordDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      ></PasswordDialog>

      {(user?.firstName !== firstName ||
        user?.lastName !== lastName ||
        user?.email !== email) && (
          <Grid container spacing={3}>
            <Button startIcon={<Check />} color="success" size="large">
              Change
            </Button>
            <Button startIcon={<Close />} color="secondary" size="large">
              Cancel
            </Button>
          </Grid>
        )}
    </Grid>
  );
}
