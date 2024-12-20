import * as React from "react";
import {
	Button,
	FormControl,
	InputLabel,
	OutlinedInput,
	TextField,
	InputAdornment,
	IconButton,
	Box,
	Typography,
	Select,
	MenuItem,
	SelectChangeEvent,
	Link,
	Grid2 as Grid,
} from "@mui/material";
import z from "zod";
import { register } from "@/services/authService";
import { useNavigate } from "react-router";
import { Iconify } from "@/components/iconify";
import { withAuthRedirect } from "./withAuthRedirect";
import { Helmet } from "react-helmet-async";
import { CONFIG } from "@/config-global";
import { FormHelperText } from "@mui/material";

export default withAuthRedirect(function Register() {
	const [showPassword, setShowPassword] = React.useState(false);
	const [firstName, setFirstName] = React.useState<string>("");
	const [lastName, setLastName] = React.useState<string>("");
	const [email, setEmail] = React.useState<string>("");
	const [password, setPwd] = React.useState<string>("");
	const [re_pwd, setRe_pwd] = React.useState<string>("");
	const [department, setDepartment] = React.useState<string | undefined>("");
	const [role, setRole] = React.useState<string>("user");
	const [enrolment, setEnrolment] = React.useState<string>("");

	const EmailVali = z.string().email();
	const PassVali = z.string().min(6);
	const FirstNameVali = z.string().min(3, 'Name must be at least 3 characters long.');

	const emailMessage = EmailVali.safeParse(email).error?.errors[0].message;
	const pasMessage = PassVali.safeParse(password).error?.errors[0].message;
	const firstNameMessage = FirstNameVali.safeParse(firstName).error?.errors[0].message;

	const navigate = useNavigate();

	React.useEffect(() => {
		if (role === "grant_dep") {
			setDepartment("");
		} else if (department == undefined) {
			setDepartment("");
		}
	}, [role]);

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

		const departmentValue = role === "grant_dep" ? undefined : department;
		const tempDepartment = role === "user" ? enrolment : undefined;

		register(
			{
				firstName,
				lastName,
				email,
				password,
				department: departmentValue,
				role,
				enrolment: tempDepartment,
			},
			navigate
		);
	};

	return (
		<>
			<Helmet>
				<title> {`Register - ${CONFIG.appName}`}</title>
			</Helmet>

			<Box
				display="flex"
				flexDirection="column"
				className="w-50"
				alignItems="center"
			>
				<Typography
					variant="h3"
					sx={{ fontWeight: "bold", textAlign: "center" }}
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
							error={!!firstName && !!firstNameMessage}
							helperText={!!firstName && !!firstNameMessage ? firstNameMessage: undefined}
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
					error={!!(emailMessage && email)}
					helperText={email ? emailMessage : undefined}
					value={email}
					onChange={(val) => setEmail(val.target.value)}
				/>
				<FormControl sx={{ my: 2 }} fullWidth variant="outlined">
					<InputLabel
						htmlFor="outlined-adornment-password"
						error={!!(pasMessage && password)}
					>
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
									onClick={() => setShowPassword(!showPassword)}
									edge="end"
								>
									<Iconify
										icon={
											showPassword ? "solar:eye-bold" : "solar:eye-closed-bold"
										}
									/>
								</IconButton>
							</InputAdornment>
						}
						label="Password"
					/>
					{!!(pasMessage && password) && (
						<FormHelperText error={!!(pasMessage && password)}>
							{pasMessage}
						</FormHelperText>
					)}
				</FormControl>

				<FormControl sx={{ mb: 2 }} fullWidth variant="outlined">
					<InputLabel
						error={!!re_pwd && re_pwd !== password}
						htmlFor="outlined-adornment-password"
					>
						Confirm Password
					</InputLabel>
					<OutlinedInput
						id="outlined-adornment-confirm-password"
						type={showPassword ? "text" : "password"}
						name="password-confirm"
						value={re_pwd}
						error={!!re_pwd && re_pwd !== password}
						onChange={(val) => setRe_pwd(val.target.value)}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									onClick={() => setShowPassword(!showPassword)}
									edge="end"
								>
									<Iconify
										icon={
											showPassword ? "solar:eye-bold" : "solar:eye-closed-bold"
										}
									/>
								</IconButton>
							</InputAdornment>
						}
						label="Confirm Password"
					/>
					{re_pwd && re_pwd !== password && (
						<FormHelperText error={!!(pasMessage && password)}>
							Passwords don't match
						</FormHelperText>
					)}
				</FormControl>
				{role !== "grant_dep" && (
					<FormControl fullWidth>
						<InputLabel id="department-select-label">Department</InputLabel>
						<Select
							labelId="department-select-label"
							id="department-select"
							className="text-start"
							value={department}
							label="Department"
							onChange={handleDepartmentChange}
						>
							<MenuItem value="philosophy">Philosophy</MenuItem>
							<MenuItem value="department1">Department 1</MenuItem>
							<MenuItem value="department2">Department 2</MenuItem>
							<MenuItem value="department3">Department 3</MenuItem>
						</Select>
					</FormControl>
				)}

				<Grid container spacing={2} width={"100%"}>
					<Grid size={role == "user" ? 6 : 12}>
						<FormControl fullWidth sx={{ mt: 2 }}>
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
								<MenuItem value="grant_dep">Grand Admin</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					{role == "user" && (
						<Grid size={6} mt={2}>
							<TextField
								label="Enrolment number"
								fullWidth
								type="number"
								slotProps={{
									inputLabel: {
										shrink: true,
									},
								}}
								value={enrolment}
								onChange={(e) => setEnrolment(e.target.value)}
							></TextField>
						</Grid>
					)}
				</Grid>

				<Button
					type="submit"
					variant="contained"
					color="info"
					disableElevation
					size="large"
					fullWidth
					sx={{ my: 2 }}
					onClick={registerTrigger}
				>
					Register
				</Button>
				<Link href="/login" variant="body2">
					Do you have an account already?
				</Link>
			</Box>
		</>
		//   </Container>
		// </Box>
	);
});
