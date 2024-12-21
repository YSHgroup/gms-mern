import {
	Grid2 as Grid,
	Button,
	styled,
	Box,
	TextField,
	Autocomplete,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

import React from "react";
import { publishAnnouncement } from "@/services/announcementServices";
import { currencyTypes } from "@/constants/currencyType";
import { useTheme } from "@mui/material";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

// ----------------------------------------------------------------------

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

export default function WorkPanel() {
	const [imgUrl, setImgUrl] = React.useState<string>("");
	const [img, setImg] = React.useState<File | null>(null);
	const [title, setTitle] = React.useState<string>("");
	const [currencyType, setCurrencyType] = React.useState<{
		value: string;
		label: string;
	} | null>({
		value: "dollar",
		label: "Dollar",
	});
	const [date, setDate] = React.useState<any>({
		from: "",
		until: "",
	});
	const [budget, setBudget] = React.useState<string>("");
	const [content, setContent] = React.useState<string>("");
	const imageUpload = (files: FileList | null) => {
		if (files && files.length > 0) {
			setImg(files[0]);

			const imageUrl = URL.createObjectURL(files[0]);
			setImgUrl(imageUrl);
		}
	};
	const theme = useTheme();

	const removeImage = () => {
		setImgUrl("");
		setImg(null);
	};

	const submitAnnouncement = () => {
		if (!title || !content || !date || !currencyType || !img) {
			toast.warn("Please confirm all fields. those are mandatory.");
			return;
		}

		const data = {
			title,
			content,
			from: date.from,
			until: date.until,
			budget,
			currencyType: currencyType?.value,
		};
		publishAnnouncement(data, img)
			.then((res) => {
				setImgUrl("");
				setImg(null);
				setTitle("");
				setCurrencyType({
					value: "dollar",
					label: "Dollar",
				});
				setDate({
					from: "",
					until: "",
				});
				setBudget("");
				setContent("");
        URL.revokeObjectURL(imgUrl)
				toast.success("Announcement published");
			})
			.catch((error) => {
				if (isAxiosError(error))
					error.response?.data.msg.map((str: string) => {
						toast.error(str);
					});
			});
	};

	return (
		<Grid container spacing={2}>
			<Grid size={12}>
				<TextField
					label="Title"
					variant="outlined"
					multiline
					fullWidth
          value={title}
					onChange={(e) => setTitle(e.target.value)}
				></TextField>
			</Grid>
			<Grid size={12} width={"100%"} display={"flex"} justifyContent={"center"}>
				<Box maxHeight={"500px"} width={!imgUrl ? "100%" : "300px"}>
					{!imgUrl ? (
						<Button
							component="label"
							role={undefined}
							variant="contained"
							tabIndex={-1}
							color="info"
							startIcon={<CloudUpload />}
						>
							Upload Image
							<VisuallyHiddenInput
								accept="image/*"
								type="file"
								onChange={(event) => imageUpload(event.target.files)}
							/>
						</Button>
					) : (
						<Button onClick={removeImage}>
							<img src={imgUrl} alt={img?.name} />
						</Button>
					)}
				</Box>
			</Grid>

			<Grid size={12}>
				<TextField
					label="From"
					variant="outlined"
					slotProps={{
						inputLabel: {
							shrink: true,
						},
					}}
					type="date"
          value={date.from}
					onChange={(e) =>
						setDate((pre: any) => ({ ...pre, from: e.target.value }))
					}
				></TextField>
				<span className="p-2"></span>
				<TextField
					label="Until"
					variant="outlined"
					slotProps={{
						inputLabel: {
							shrink: true,
						},
					}}
					type="date"
          value={date.until}
					onChange={(e) =>
						setDate((pre: any) => ({ ...pre, until: e.target.value }))
					}
				></TextField>
			</Grid>

			<Grid container size={12}>
				<Grid size={{ sm: 4, xs: 7 }}>
					<TextField
						label="Budget"
						variant="outlined"
						slotProps={{
							inputLabel: {
								shrink: true,
							},
						}}
						fullWidth
						type="number"
            value={budget}
						onChange={(e) => setBudget(e.target.value)}
					></TextField>
				</Grid>
				<Grid size={{ sm: 4, xs: 5 }}>
					<Autocomplete
						disablePortal
						options={currencyTypes}
						fullWidth
						value={currencyType}
						onChange={(e, nv) => setCurrencyType(nv)}
						renderInput={(params) => (
							<TextField {...params} label="Currency Type" />
						)}
					/>
				</Grid>
				<Grid
					size={4}
					sx={{
						[theme.breakpoints.down("xs")]: {
							display: "none",
							m: 0,
						},
					}}
				></Grid>
			</Grid>

			<Grid size={12}>
				<TextField
					label="Text Content"
					multiline
					minRows={4}
					fullWidth
					margin="normal"
          value={content}
					onChange={(e) => setContent(e.target.value)}
				></TextField>
			</Grid>
			<Grid size={12}>
				<Button variant="contained" size="large" onClick={submitAnnouncement}>
					Publish
				</Button>
			</Grid>
		</Grid>
	);
}
