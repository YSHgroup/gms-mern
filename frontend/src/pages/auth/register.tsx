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
  Select,
  MenuItem,
  SelectChangeEvent,
  Link,
  Grid2 as Grid,
} from "@mui/material";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import { register } from "@/services/authService";
import { useNavigate } from "react-router";

export default function Register() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPwd] = React.useState<string>("");
  const [re_pwd, setRe_pwd] = React.useState<string>("");
  const [department, setDepartment] = React.useState<string>("");
  const [role, setRole] = React.useState<string>("user");

  const navigate = useNavigate()

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };
  const handleDepartmentChange = (event: SelectChangeEvent) => {
    setDepartment(event.target.value);
  };
  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };

  const registerTrigger = () => {
    if (re_pwd !== password) {
      return;
    }

    register({ firstName, lastName, email, password, department, role }, navigate);
  };

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
              Register
            </Typography>
            <Typography variant="subtitle1" component="h6" sx={{ top: "50%" }}>
              Welcome
            </Typography>
            <Grid container spacing={2} className="my-4">
              <Grid size={6}>
                <TextField
                  label="Fist Name"
                  type="text"
                  variant="outlined"
                  fullWidth
                  name="fist_name"
                  value={firstName}
                  onChange={(val) => setFirstName(val.target.value)}
                ></TextField>
              </Grid>
              <Grid size={6}>
                <TextField
                  label="Last Name"
                  type="text"
                  variant="outlined"
                  fullWidth
                  name="last_name"
                  value={lastName}
                  onChange={(val) => setLastName(val.target.value)}
                ></TextField>
              </Grid>
            </Grid>
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

            <FormControl sx={{ mb: 2 }} fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirm-password"
                type={showPassword ? "text" : "password"}
                name="password-confirm"
                value={re_pwd}
                onChange={(val) => setRe_pwd(val.target.value)}
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
                label="Confirm Password"
              />
            </FormControl>

            <Grid container spacing={2}>
              <Grid size={7}>
                <FormControl fullWidth>
                  <InputLabel id="department-select-label">
                    Department
                  </InputLabel>
                  <Select
                    labelId="department-select-label"
                    id="department-select"
                    className="text-start"
                    value={department}
                    label="Department"
                    onChange={handleDepartmentChange}
                  >
                    <MenuItem value="phylosopy">Phylosopy</MenuItem>
                    <MenuItem value="department1">Department 1</MenuItem>
                    <MenuItem value="department2">Department 2</MenuItem>
                    <MenuItem value="department3">Department 3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={5}>
                <FormControl fullWidth>
                  <InputLabel id="role-select-label">Role</InputLabel>
                  <Select
                    labelId="role-select-label"
                    id="role-select"
                    value={role}
                    label="Role"
                    className="text-start"
                    onChange={handleRoleChange}
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="reviewer">Reviewer</MenuItem>
                    <MenuItem value="col_dean">College Dean</MenuItem>
                    <MenuItem value="grant_dep">Grant Department</MenuItem>
                    <MenuItem value="grant_dir">Grant Director</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              color="info"
              disableElevation
              fullWidth
              sx={{ my: 2 }}
              onClick={registerTrigger}
            >
              Register
            </Button>
            <Link href="/login" variant="body2">
              Do you have an account already?
            </Link>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
