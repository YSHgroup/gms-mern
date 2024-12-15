import { Iconify } from "@/components/iconify";
import { changePassword } from "@/services/userService";
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogProps,
  DialogTitle,
  Divider,
  Grid2 as Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type PwdProps = {
  curPassword: string;
  newPassword: string;
  rePassword: string;
};
export function PasswordDialog({
  onClose,
  ...props
}: DialogProps & { onClose: () => void }) {
  const [pwd, setPwd] = useState<PwdProps>({
    curPassword: "",
    newPassword: "",
    rePassword: "",
  });
  const [open, setOpen] = useState(props.open);
  const [showPassword, setShowPassword] = useState(false);

  const handleClose = () => {
    setPwd({ curPassword: "", newPassword: "", rePassword: "" });
    setOpen(false);
    onClose();
  };

  const submitChange = () => {
    if (pwd.newPassword === pwd.rePassword) {
      changePassword({
        currentPassword: pwd.curPassword,
        newPassword: pwd.newPassword,
      });
      handleClose();
    } else {
      toast.error("Confirm password does not match");
    }
  };

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  return (
    <Dialog {...props} open={open} onClose={handleClose}>
      <DialogTitle color="primary" display={'flex'} justifyContent={'space-between'}>
        <span>Changing Password</span>
        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
          <Iconify
            icon={showPassword ? "solar:eye-bold" : "solar:eye-closed-bold"}
          />
        </IconButton>
      </DialogTitle>
      <Divider color="primary" />
      <Grid component={"form"} container spacing={3} m={3}>
        <Grid size={12}>
          <TextField
            label="Current Password"
            name="current_password"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={pwd?.curPassword}
            onChange={(e) => setPwd({ ...pwd, curPassword: e.target.value })}
          ></TextField>
        </Grid>

        <Grid size={12}>
          <TextField
            label="New Password"
            name="new_password"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={pwd?.newPassword}
            onChange={(e) => setPwd({ ...pwd, newPassword: e.target.value })}
          ></TextField>
        </Grid>

        <Grid size={12}>
          <TextField
            label="Confirm Password"
            name="confirm_password"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={pwd?.rePassword}
            onChange={(e) => setPwd({ ...pwd, rePassword: e.target.value })}
          ></TextField>
        </Grid>

        <Grid size={12} display={"flex"} justifyContent={"center"}>
          <ButtonGroup>
            <Button variant="contained" onClick={submitChange}>
              Confirm
            </Button>
            <Button color="secondary" variant="contained" onClick={handleClose}>
              Cancel
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Dialog>
  );
}
