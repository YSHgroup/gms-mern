import { DashboardContent } from "@/layouts/dashboard";
import {
	Typography,
	Grid2 as Grid,
	Paper,
	Button,
	styled,
	Box,
	LinearProgress,
	TextField,
} from "@mui/material";

import { CloudUpload, Publish } from "@mui/icons-material";
import React from "react";
import PDFPreview from "@/components/PdfPreviewer";
import { requestGrant } from "@/services/grantService";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import { Autocomplete } from "@mui/material";
import { currencyTypes } from "@/constants/currencyType";
import { isAxiosError } from "axios";
import { useRouter } from "@/routes/hooks";
import { getAnnouncementById } from "@/services/announcementServices";

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});

export default function ApplySection() {
	const router = useRouter();
	const [file, setFile] = React.useState<File | null>(null);
	const [fileUrl, setFileUrl] = React.useState<string>();
	const [isLoading, setLoading] = React.useState<boolean>(false);
	const [budget, setBudget] = React.useState<any>({
		budget: "",
		milestone: "",
	});
	const [budgetLimitation, setLimit] = React.useState(10000);
	const [currencyType, setCurrencyType] = React.useState<{
		value: string;
		label: string;
	} | null>({
		value: "dollar",
		label: "Dollar",
	});

	const params = useParams();

	// const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	// const openCombo = Boolean(anchorEl);

	React.useEffect(() => {
		if (params.id) {
			getAnnouncementById(params.id)
				.then((res) => {
					setLimit(res.data.budget);
				})
				.catch(() => {
					setLimit(10000);
				});
		}
	}, []);

	const upload = (files: FileList | null) => {
		setLoading(true);
		if (files && files.length > 0) {
			console.log(files);
			setFile(files[0]);

			const filePath = URL.createObjectURL(files[0]);
			setFileUrl(filePath);
		}
	};

	const publishApplication = () => {
		if (!budget) {
			toast.warn("Please select budget.");
			return;
		}
		if (!budget.milestone) {
			toast.warn("Please select milestone.");
		}
		if (!file) {
			toast.warn("Please select a file to upload");
			return;
		}
		if (!currencyType) {
			toast.warn("Please select a currency type.");
			return;
		}

		if (params?.id) {
			requestGrant(
				file,
				params.id,
				budget.budget,
				budget.milestone,
				currencyType.value
			)
				.then((response) => {
					setFile(null);
					setLoading(false);
					setBudget({
						budget: "",
						milestone: "",
					});
					if (fileUrl) {
						URL.revokeObjectURL(fileUrl);
					}
					setFileUrl("");
					toast.success("Application submitted");
					router.push("/");
				})
				.catch((error) => {
					if (isAxiosError(error))
						error.response?.data.msg.map((str: string) => {
							toast.error(str);
						});
				});
			return;
		}
		toast.warn("Please select announcement");
	};

	React.useEffect(() => {
		setLoading(false);
	}, [file]);

	const handleBudgetChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (Number(e.target.value) <= budgetLimitation) {
			setBudget((pre: any) => ({
				...pre,
				budget: e.target.value,
			}));
		}
	};

	return (
		<DashboardContent maxWidth="xl">
			<Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
				Apply
			</Typography>

			<Paper elevation={1} className="p-4">
				<Grid container spacing={4}>
					<Grid
						size={12}
						display={"flex"}
						justifyContent={"center"}
						borderBottom={1}
						borderColor={"lightgray"}
					>
						<Typography variant="h6" my={2} color="info">
							Apply with your documentation
						</Typography>
					</Grid>

					<Grid container size={12} spacing={2}>
						<Grid container size={{ md: 5, xs: 12 }}>
							<Grid size={7}>
								<TextField
									label="Budget"
									variant="outlined"
									fullWidth
									type="number"
									value={budget.budget}
									onChange={handleBudgetChange}
								></TextField>
							</Grid>
							<Grid size={5}>
								<Autocomplete
									disablePortal
									options={currencyTypes}
									value={currencyType}
									fullWidth
									onChange={(e, nv) => setCurrencyType(nv)}
									renderInput={(params) => (
										<TextField
											{...params}
											slotProps={{
												inputLabel: {
													shrink: true,
												},
											}}
											label="Currency Type"
										/>
									)}
								/>
							</Grid>
						</Grid>
						<Grid size={{ md: 5, xs: 12 }}>
							<TextField
								label="Milestone"
								variant="outlined"
								slotProps={{
									inputLabel: {
										shrink: true,
									},
								}}
								value={budget.milestone}
								onChange={(e) =>
									setBudget((pre: any) => ({
										...pre,
										milestone: e.target.value,
									}))
								}
							></TextField>
						</Grid>
						<Grid size={2}></Grid>
					</Grid>

					<Grid size={12} container justifyContent={"center"}>
						<Grid
							size={{ sm: 6, xs: 12 }}
							display="flex"
							justifyContent={"center"}
						>
							<Button
								component="label"
								role={undefined}
								variant="contained"
								tabIndex={-1}
								color="info"
								startIcon={<CloudUpload />}
							>
								Upload Document
								<VisuallyHiddenInput
									accept="application/pdf"
									type="file"
									onChange={(event) => upload(event.target.files)}
								/>
							</Button>
						</Grid>
						{fileUrl && (
							<Grid
								size={{ sm: 6, xs: 12 }}
								display="flex"
								justifyContent={"center"}
							>
								<Button
									variant="contained"
									startIcon={<Publish />}
									onClick={publishApplication}
								>
									Publish Application
								</Button>
							</Grid>
						)}
					</Grid>

					<Grid size={12} display={"flex"} justifyContent={"center"}>
						{isLoading ? (
							<Box sx={{ width: "70%" }}>
								<LinearProgress />
							</Box>
						) : fileUrl ? (
							<PDFPreview file={fileUrl}></PDFPreview>
						) : (
							<Typography color="textSecondary" variant="subtitle1">
								No file uploaded
							</Typography>
						)}
					</Grid>
				</Grid>
			</Paper>
			{/* </Container> */}
		</DashboardContent>
	);
}
