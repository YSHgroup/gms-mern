import * as React from "react";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Card,
  CardContent,
  Typography,
  Link
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { login } from "@/services/authService";
import { useNavigate } from "react-router";
import { Iconify } from "@/components/iconify";
import { withAuthRedirect } from "./withAuthRedirect";

export default withAuthRedirect(function SlotsSignIn() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPwd] = React.useState<string>("");

  const [showPassword, setShowPassword] = React.useState(false);

  const navigate = useNavigate()

  const loginTrigger = () => login(email, password, navigate)

  return (
    // <Box
    //   sx={{ height: "100vh", maxHeight: "100vh" }}
    //   className="flex items-center"
    // >
      // <Container maxWidth="sm" className="items-center">
        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <CardContent sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", textAlign: "center" }}
              component="h2"
            >
              Login
            </Typography>
            <Typography className="py-4 my-2" variant="subtitle1" component="h6" sx={{ top: "50%" }}>
              Welcome, please sign in to continue
            </Typography>

            <TextField
              fullWidth
              name="email"
              label="Email address"
              type="email"
              required
              value={email}
              slotProps={{
                inputLabel: {
                  shrink: true
                }
              }}
              onChange={(val) => setEmail(val.target.value)}
            />
            <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(val) => setPwd(val.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="info"
              disableElevation
              fullWidth
              size="large"
              sx={{ my: 2 }}
              onClick={loginTrigger}
            >
              Login
            </Button>
            <Link href="/register" variant="body2">
              Don't have an account yet?
            </Link>
          </CardContent>
        </Box>
    //   </Container>
    // </Box>
  );
})