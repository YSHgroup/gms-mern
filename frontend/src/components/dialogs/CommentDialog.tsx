import { getRole } from "@/utils/roleGetter";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	Link,
	TextField,
	Typography,
} from "@mui/material";
import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

type Props = {
	row: any;
	user: any;
	viewCommentState: boolean;
	comment: string;
	openComment: boolean;
	uploadedFile?: File | null;
	handleCloseCommentDialog: (
		event: {},
		reason: "backdropClick" | "escapeKeyDown"
	) => void;
	setComment: Function;
	setOpenComment: Function;
	submitComment: Function;
	cancelComment: Function;
	onUploadFile?: (pa: any) => void;
	onRemove?: Function;
};

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

interface InputFileUploadProps {
	onUploadFile: (pa: any) => void;
}

const InputFileUpload: React.FC<InputFileUploadProps> = ({ onUploadFile }) => {
	return (
		<Button component="label" variant="text" color="info">
			Upload file:
			<VisuallyHiddenInput
				type="file"
				accept="application/pdf"
				onChange={(e) => {
					if (e.target.files) {
						onUploadFile(e.target.files[0]);
					}
				}}
				hidden
			/>
		</Button>
	);
};

export default function CommentDialog({
	row,
	user,
	viewCommentState,
	comment,
	uploadedFile,
	openComment,
	handleCloseCommentDialog,
	setComment,
	setOpenComment,
	submitComment,
	cancelComment,
	onUploadFile,
	onRemove,
}: Props) {
	return (
		<Dialog open={openComment} onClose={handleCloseCommentDialog}>
			<DialogTitle mb={1}>Comment</DialogTitle>
			{viewCommentState ? (
				<DialogContent sx={{ minWidth: 300 }}>
					{row.comment ? (
						Object.keys(row.comment)
							.filter((key) =>
								[
									"reviewer_1",
									"reviewer_2",
									"grant_dep",
									"grant_dir",
									"col_dean",
								].includes(key)
							)
							.map((key: string) => (
								<Box p={2} minWidth={300} key={key}>
									<Typography variant="h6">{getRole(key)}</Typography>

									<Typography variant="body1">
										{row.comment[key].text}
									</Typography>
									{row.comment[key].url && (
										<Link
											href={`${import.meta.env.VITE_BASE_URL}/reviews/${
												row.comment[key].url
											}`}
											target="_blank"
										>
											View attached document
										</Link>
									)}
								</Box>
							))
					) : (
						<Typography variant="h6" color="info" textAlign={"center"}>
							No comment
						</Typography>
					)}
				</DialogContent>
			) : (
				<Box px={3}>
					<TextField
						label="Comment"
						variant="outlined"
						minRows={3}
						fullWidth
						multiline
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					></TextField>
					<TextField
						fullWidth
						hidden
						sx={{
							visibility: "hidden",
							height: 0,
							m: 0,
							p: 0,
						}}
					></TextField>
					{/* <Box> */}
					{(user.role === "reviewer_1" ||
						user.role === "reviewer_2" ||
						user.role === "col_dean") &&
					onUploadFile ? (
						<Box display={"flex"}>
							{uploadedFile ? (
								<Button
									component="label"
									onClick={() => {
										if (onRemove) onRemove();
									}}
									variant="text"
									color="error"
								>
									Remove:
								</Button>
							) : (
								<InputFileUpload onUploadFile={onUploadFile}></InputFileUpload>
							)}
							{uploadedFile && (
								<Typography lineHeight={2}>{uploadedFile.name}</Typography>
							)}
						</Box>
					) : (
						""
					)}
					{/* </Box> */}
				</Box>
			)}
			{viewCommentState ? (
				<Button onClick={() => setOpenComment(false)} size="large">
					Close
				</Button>
			) : (
				<Box display={"flex"} justifyContent={"end"} px={2} pb={2}>
					<Box>
						<Button onClick={() => submitComment(row.id)} color="primary">
							Submit
						</Button>
						<Button onClick={() => cancelComment()} color="secondary">
							Cancel
						</Button>
					</Box>
				</Box>
			)}
		</Dialog>
	);
}
