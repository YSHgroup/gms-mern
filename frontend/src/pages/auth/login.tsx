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
	CardContent,
	Typography,
	Link,
	FormHelperText,
} from "@mui/material";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import z from "zod";
import { login } from "@/services/authService";
import { Iconify } from "@/components/iconify";
import { withAuthRedirect } from "./withAuthRedirect";
import { CONFIG } from "@/config-global";

export default withAuthRedirect(function SlotsSignIn() {
	const navigate = useNavigate();
	
	const [email, setEmail] = React.useState<string>("");
	const [password, setPwd] = React.useState<string>("");
	const [showPassword, setShowPassword] = React.useState(false);

	const EmailVali = z.string().email();
	const PassVali = z.string().min(6);

	const emailMessage = EmailVali.safeParse(email).error?.errors[0].message;
	const pasMessage = PassVali.safeParse(password).error?.errors[0].message;


	const loginTrigger = () => login(email, password, navigate);

	return (
		<>
			<Helmet>
				<title> {`Login - ${CONFIG.appName}`}</title>
			</Helmet>
			<Box display="flex" flexDirection="column" alignItems="flex-end">
				<CardContent sx={{ textAlign: "center" }}>
					<Typography
						variant="h3"
						sx={{ fontWeight: "bold", textAlign: "center" }}
					>
						Login
					</Typography>
					<Typography
						className="py-4 my-2"
						variant="subtitle1"
						component="h6"
						sx={{ top: "50%" }}
					>
						Welcome, please sign in to continue
					</Typography>

					<TextField
						fullWidth
						name="email"
						label="Email address"
						type="email"
						required
						error={!!(emailMessage && email)}
						helperText={email ? emailMessage : undefined}
						value={email}
						slotProps={{
							inputLabel: {
								shrink: true,
							},
						}}
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
							error={!!(pasMessage && password)}
							onChange={(val) => setPwd(val.target.value)}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										onClick={() => setShowPassword(!showPassword)}
										edge="end"
									>
										<Iconify
											icon={
												showPassword
													? "solar:eye-bold"
													: "solar:eye-closed-bold"
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
						Don't you have an account yet?
					</Link>
				</CardContent>
			</Box>
		</>
		//   </Container>
		// </Box>
	);
});
