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

export default function SlotsSignIn() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPwd] = React.useState<string>("");

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };
  const navigate = useNavigate()


  const loginTrigger = () => login(email, password, navigate)

  return (
    <Box
      sx={{ height: "100vh", maxHeight: "100vh" }}
      className="flex items-center"
    >
      <Container maxWidth="sm" className="items-center">
        <Card>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", textAlign: "center" }}
              component="h2"
            >
              Login
            </Typography>
            <Typography variant="subtitle1" component="h6" sx={{ top: "50%" }}>
              Welcome, please sign in to continue
            </Typography>

            <TextField
              id="input-with-icon-textfield"
              label="Email"
              name="email"
              type="email"
              required
              fullWidth
              value={email}
              onChange={(val) => setEmail(val.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                },
              }}
              variant="outlined"
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
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff fontSize="inherit" />
                      ) : (
                        <Visibility fontSize="inherit" />
                      )}
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
              sx={{ my: 2 }}
              onClick={loginTrigger}
            >
              Login
            </Button>
            <Link href="/register" variant="body2">
              Don't have an account yet?
            </Link>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
