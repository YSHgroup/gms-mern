import { useState, useCallback } from "react";

import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import MenuList from "@mui/material/MenuList";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import MenuItem, { menuItemClasses } from "@mui/material/MenuItem";

import { Iconify } from "@/components/iconify";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Link,
	Typography,
} from "@mui/material";
import { Button } from "@mui/material";
import { getCurrentUser } from "@/services/authService";
import { postComment, signApplication } from "@/services/grantService";
import { useAppDispatch } from "@/redux/hooks";
import { fetchRequestData } from "@/redux/slices/requestSlice";
import CommentDialog from "../dialogs/CommentDialog";

// ----------------------------------------------------------------------

type UserTableRowProps = {
	row: any;
	headList: string[];
	selected: boolean;
	onSelectRow: () => void;
	onAccept: (...value: any) => void;
	onDeny: (...value: any) => void;
};

export function UserTableRow({
	headList,
	row,
	selected,
	// onSelectRow,
	onAccept,
	onDeny,
}: UserTableRowProps) {
	const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(
		null
	);
	const [state, setState] = useState<boolean | null>(null);
	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const [openComment, setOpenComment] = useState<boolean>(false);
	const [signState, setSignState] = useState<boolean>(false);
	const [comment, setComment] = useState("");
	const [viewCommentState, setViewComment] = useState(false);
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);
	const user = getCurrentUser();

	const dispatch = useAppDispatch();

	const handleAcceptClick = useCallback(() => {
		setState(true);
		setOpenDialog(true);
	}, []);

	const handleDenyClick = useCallback(() => {
		setState(false);
		setOpenDialog(true);
	}, []);

	const handleCloseDialog = () => {
		setOpenDialog(false);
		setState(null);
	};
	const confirmState = (id: string) => {
		if (openDialog) {
			state && onAccept(id);
			state !== null && !state && onDeny(id);
			if (signState) {
				signApplication(id, "approved", () => dispatch(fetchRequestData()));
				setSignState(false);
				setOpenDialog(false);
				return;
			}
			setOpenDialog(false);
			setState(null);
		}
	};
	const denySign = (id: string) => {
		signApplication(id, "rejected", () => dispatch(fetchRequestData()));
		setOpenDialog(false);
		setSignState(false);
	};

	const cancelAction = () => {
		setOpenDialog(false);
		setSignState(false);
		setState(null);
	};

	const handleOpenPopover = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			setOpenPopover(event.currentTarget);
		},
		[]
	);
	const submitComment = (id: string) => {
		if (comment.trim()) {
			postComment(id, comment, uploadedFile);
			setOpenComment(false);
			setComment("");
			setViewComment(false)
			if(uploadedFile) setUploadedFile(null)
		}
	};

	const cancelComment = () => {
		setOpenComment(false);
		setViewComment(false)
		setComment("");
	};

	const handleClosePopover = useCallback(() => {
		setOpenPopover(null);
	}, []);
	const handleCloseCommentDialog = () => {
		setOpenComment(false);
		setViewComment(false);
	};
	const handleSign = () => {
		setOpenDialog(true);
		setSignState(true);
	};

	const viewComment = () => {
		setOpenComment(true);
		setViewComment(true);
	};

	const uploadFile = (file: File) => {
		setUploadedFile(file)
	}
	const removeFile = () => {
		if(uploadedFile) {
			setUploadedFile(null)
		}
	}

	return (
		<>
			<TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
				{/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell> */}
				{headList.map((headItem: any, i) => (
					<TableCell
						key={row.id + row[headItem.id] + i}
						align={
							[
								"reviewer_1",
								"reviewer_2",
								"assigned",
								"col_dean",
								"grant_dep",
								"grant_dir",
								"finance",
							].includes(headItem.id)
								? "center"
								: "left"
						}
					>
						<>
							{headItem.id === "announcement" ? (
								row["announcement"].title
							) : [
									"reviewer_1",
									"reviewer_2",
									"assigned",
									"col_dean",
									"grant_dep",
									"grant_dir",
									"finance",
							  ].includes(headItem.id) ? (
								row[headItem.id] == "approved" ? (
									<Iconify
										width={22}
										icon="solar:check-circle-bold"
										sx={{ color: "success.main" }}
									/>
								) : row[headItem.id] == "rejected" ? (
									<Iconify
										width={22}
										icon="solar:close-circle-bold-duotone"
										sx={{ color: "error.main" }}
									/>
								) : (
									<> - </>
								)
							) : headItem.id == "application" ? (
								<Link
									href={`${import.meta.env.VITE_BASE_URL}/application/${
										row[headItem.id]
									}`}
									target="_blank"
								>
									View
								</Link>
							) : (
								row[headItem.id]
							)}
						</>{" "}
					</TableCell>
				))}

				<TableCell align="right">
					<IconButton onClick={handleOpenPopover}>
						<Iconify icon="eva:more-vertical-fill" />
					</IconButton>
				</TableCell>

				<Popover
					open={!!openPopover}
					anchorEl={openPopover}
					onClose={handleClosePopover}
					anchorOrigin={{ vertical: "top", horizontal: "left" }}
					transformOrigin={{ vertical: "top", horizontal: "right" }}
				>
					<MenuList
						disablePadding
						sx={{
							p: 0.5,
							gap: 0.5,
							width: 180,
							display: "flex",
							flexDirection: "column",
							[`& .${menuItemClasses.root}`]: {
								px: 1,
								gap: 2,
								borderRadius: 0.75,
								[`&.${menuItemClasses.selected}`]: {
									bgcolor: "action.selected",
								},
							},
						}}
					>
						{user?.role != "user" && row[user?.role] == "pending" && (
							<>
								<MenuItem
									onClick={handleAcceptClick}
									sx={{ color: "success.main" }}
								>
									<Iconify icon="solar:check-circle-broken" />
									Accept
								</MenuItem>

								<MenuItem
									onClick={handleDenyClick}
									sx={{ color: "error.main" }}
								>
									<Iconify icon="solar:forbidden-circle-broken" />
									Deny
								</MenuItem>
							</>
						)}

						{user.role !== "user" && (
							<MenuItem
								onClick={() => setOpenComment((pre) => !pre)}
								sx={{ color: "info.main" }}
							>
								<Iconify icon="solar:paperclip-outline" />
								Comment
							</MenuItem>
						)}
						{/* {
              (user?.role != "col_dean" || user?.role != "user") && (row.signed && row.rejected) && (
                <>
                  No available action
                </>
              )
            } */}
						{(user?.role == "col_dean" || user?.role == "user") && (
							<MenuItem onClick={viewComment} sx={{ color: "success.main" }}>
								<Iconify icon="solar:paperclip-outline" />
								View Comments
							</MenuItem>
						)}
						{user?.role == "col_dean" && row.assigned == "pending" && (
							<MenuItem sx={{ color: "success.main" }} onClick={handleSign}>
								<Iconify icon="solar:check-circle-linear" />
								Sign
							</MenuItem>
						)}
					</MenuList>
				</Popover>

				<Dialog open={openDialog} onClose={handleCloseDialog}>
					<DialogTitle mb={1}>Confirm action</DialogTitle>
					<Typography p={2}>
						Are you sure you want to{" "}
						{signState ? "sign" : state ? "accept" : "deny"} this application?
					</Typography>
					<DialogActions>
						<Button onClick={() => confirmState(row.id)} color="primary">
							{signState ? "Sign" : "Yes"}
						</Button>
						{signState && (
							<Button onClick={() => denySign(row._id)} color="error">
								Deny
							</Button>
						)}
						<Button onClick={() => cancelAction()} color="secondary">
							{signState ? "Close" : "No"}
						</Button>
					</DialogActions>
				</Dialog>

				<CommentDialog
					row={row}
					user={user}
					openComment={openComment}
					comment={comment}
					uploadedFile={uploadedFile}
					handleCloseCommentDialog={handleCloseCommentDialog}
					setOpenComment={setOpenComment}
					cancelComment={cancelComment}
					setComment={setComment}
					submitComment={submitComment}
					viewCommentState={viewCommentState}
					onUploadFile={uploadFile}
					onRemove={removeFile}
				></CommentDialog>
			</TableRow>
		</>
	);
}
