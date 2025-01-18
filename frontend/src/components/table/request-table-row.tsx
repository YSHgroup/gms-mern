import { useState, useCallback, useEffect } from "react";

import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import MenuList from "@mui/material/MenuList";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import MenuItem, { menuItemClasses } from "@mui/material/MenuItem";

import { Iconify } from "@/components/iconify";
import {
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	Link,
	Typography,
	Tooltip
} from "@mui/material";
import { getCurrentUser } from "@/services/authService";
import { askMoreInfo, postComment } from "@/services/grantService";
import CommentDialog from "../dialogs/CommentDialog";
import {connectSocket, updateRequestRealtime,closeSocketAPI} from "@/services/realtimeUpdateService";
import AssignDialog from "../dialogs/AssignDialog";
import { useAppDispatch } from "@/redux/hooks";
import AddDocDialog from "../dialogs/AddDocDialog";
import DocPopover from "../dialogs/DocPopover";

// ----------------------------------------------------------------------

type UserTableRowProps = {
	row: any;
	headList: string[];
	selected: boolean;
	onAskInfo: (...value: any) => void;
	onAccept: (...value: any) => void;
	onDeny: (...value: any) => void;
};

export function UserTableRow({
	headList,
	row,
	selected,
	onAskInfo,
	onAccept,
	onDeny,
}: UserTableRowProps) {
	const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(
		null
	);
	const [state, setState] = useState<boolean | null>(null);
	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const [openComment, setOpenComment] = useState<boolean>(false);
	const [openAssign, setOpenAssignDialog] = useState<boolean>(false)
	const [openAskInfo, setOpenAskInfo] = useState<boolean>(false)
	const [docModal, setDocModal] = useState<boolean>(false)
	const [applicationView, setApplicationView] = useState<HTMLButtonElement | null>(null)
	const [comment, setComment] = useState("");
	const [viewCommentState, setViewComment] = useState(false);
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);
	const user = getCurrentUser();

	const dispatch = useAppDispatch()

	useEffect(() => {
		connectSocket()
		const cleanup = updateRequestRealtime(dispatch)

		return () => { 
			cleanup && cleanup()
			closeSocketAPI()
		}
	}, [])

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
			setOpenDialog(false);
			setState(null);
		}
	};

	const cancelAction = () => {
		setOpenDialog(false);
		setState(null);
	};

	const handleOpenPopover = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			setOpenPopover(event.currentTarget);
		},
		[]
	);

	const handleClosePopover = useCallback(() => {
		setOpenPopover(null);
	}, []);

	// Comment dialog
	const handleCloseCommentDialog = () => {
		setOpenComment(false);
		setViewComment(false);
	};
	const viewComment = () => {
		setOpenComment(true);
		setViewComment(true);
	};
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
	
	// Assign dialog
	const openAssignDialog = () => {
		setOpenAssignDialog(true);
	};
	
	// Handlers ask more info
	const openAskInfoDialog = () => {
		setOpenAskInfo(true);
	};
	const confirmAskInfo = (id: string) => {
		onAskInfo(id, true)
		setOpenAskInfo(false)
	};

	const uploadFile = (file: File) => {
		setUploadedFile(file)
	}
	const removeFile = () => {
		if(uploadedFile) {
			setUploadedFile(null)
		}
	}

	// Add information doc
	const openAddDocDialog = () => {
		setDocModal(true)
	}

	const openApplicationDoc = (event: React.MouseEvent<HTMLButtonElement>) => {
		setApplicationView(event.currentTarget)
	}
	const closeViewPopover = useCallback(() => {
		setApplicationView(null);
	}, []);

	const checkStatus = (column: any, status: string) => {
		if(column?.status) {
			return column?.status === status
		} else {
			return column === status
		}
	}

	const rowKeys = [
		"reviewer_1",
		"reviewer_2",
		"assigned",
		"col_dean",
		"grant_dep",
		"grant_dir",
		"finance",
    ]

	return (
		<>
			<TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
				{headList.map((headItem: any, i) => (
					<TableCell
						key={row.id + row[headItem.id] + i}
						align={
							rowKeys.includes(headItem.id)
								? "center"
								: "left"
						}
					>
						<>
							{headItem.id === "announcement" ? (
								row["announcement"].title
							) : rowKeys.includes(headItem.id) ? (
								checkStatus(row[headItem.id], "approved") ? (
									<Iconify
										width={22}
										icon="solar:check-circle-bold"
										sx={{ color: "success.main" }}
									/>
								) : checkStatus(row[headItem.id], "rejected") ? (
									<Iconify
										width={22}
										icon="solar:close-circle-bold-duotone"
										sx={{ color: "error.main" }}
									/>
								) : (
									(headItem.id == 'reviewer_1' || headItem.id == 'reviewer_2') && row[headItem.id]?.user?.email ?
										<Tooltip title={row[headItem.id]?.user.email}>
											<Typography>{`${row[headItem.id].user.firstName} ${row[headItem.id].user.lastName}`.trim()}</Typography>
										</Tooltip>
									:
										(checkStatus(row[headItem.id], "pending")) 
										&& ( row["askMoreInfo"] && headItem.id == "assigned")
											? <Typography color="primary">Info asked</Typography>
											: <> - </> 
								)
							) : headItem.id == "application" ? (
								// <Link
								// 	href={`${import.meta.env.VITE_BASE_URL}/application/${
								// 		row[headItem.id]
								// 	}`}
								// 	target="_blank"
								// >
								// 	View
								// </Link>
								<Button variant="text" onClick={(e) => openApplicationDoc(e)}>View</Button>
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
				
				{/* Action popover */}
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
						{user?.role != "user" && (row[user?.role] == "pending" || row.reviewer_1.status == "pending" || row.reviewer_2.status == "pending") && (
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
						
						{(user?.role == "col_dean" || user?.role == "user" || user?.role == "grant_dep" && row["grant_dir"] == "approved") && (
							<MenuItem onClick={viewComment} sx={{ color: "success.main" }}>
								<Iconify icon="solar:paperclip-outline" />
								View Comments
							</MenuItem>
						)}
						{user?.role == "col_dean" && row.assigned == 'pending' && (
							<>
								<MenuItem sx={{ color: "success.main" }} onClick={openAssignDialog}>
									<Iconify icon="solar:check-circle-linear" />
									Assign
								</MenuItem>
								{
									!row.askMoreInfo && (
										<MenuItem sx={{ color: "info.main" }} onClick={openAskInfoDialog}>
											<Iconify icon="solar:info-circle-broken" />
											Ask more Info
										</MenuItem>
									)
								}
							</>
						)}
						{
							user?.role == "user" && row["askMoreInfo"] && (
								<MenuItem sx={{ color: "info.main" }} onClick={openAddDocDialog}>
									<Iconify icon="solar:clapperboard-edit-broken" />
									Add document
								</MenuItem>
							)
						}
					</MenuList>
				</Popover>

				{/* assign dialog */}
				<AssignDialog
					applicationId={row._id}
					openDialog={openAssign}
					handleCloseDialog={() => {setOpenAssignDialog(false)}}
				></AssignDialog>

				{/* Add doc */}
				<AddDocDialog
					applicationId={row.id}
					openDialog={docModal}
					handleDialogClose={() => setDocModal(false)}
				></AddDocDialog>

				{/* View doc */}
				<DocPopover
					openPopover={applicationView}
					rowData={row}
					handleClosePopover={closeViewPopover}
				></DocPopover>	

				{/* Ask more info confirm */}
				<Dialog open={openAskInfo} onClose={() => setOpenAskInfo(false)}>
					<DialogTitle mb={1}>Confirm action</DialogTitle>
					<Typography p={2}>
						Ask more information for applicant
					</Typography>
					<DialogActions>
						<Button onClick={() => confirmAskInfo(row.id)} color="primary">
							Yes
						</Button>
						<Button onClick={() => setOpenAskInfo(false)} color="secondary">
							No
						</Button>
					</DialogActions>
				</Dialog>

				{/* confirm dialog */}
				<Dialog open={openDialog} onClose={handleCloseDialog}>
					<DialogTitle mb={1}>Confirm action</DialogTitle>
					<Typography p={2}>
						Are you sure you want to{" "}
						{state ? "accept" : "deny"} this application?
					</Typography>
					<DialogActions>
						<Button onClick={() => confirmState(row.id)} color="primary">
							Yes
						</Button>
						<Button onClick={() => cancelAction()} color="secondary">
							No
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