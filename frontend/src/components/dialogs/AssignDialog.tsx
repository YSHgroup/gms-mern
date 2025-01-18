import { useAppDispatch } from "@/redux/hooks";
import { fetchRequestData } from "@/redux/slices/requestSlice";
import { signApplication } from "@/services/grantService";
import { getReviewer } from "@/services/reviewersService";
import { objectCompare } from "@/utils/objectSort";
import { ListItem } from "@mui/material";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  openDialog: boolean;
  handleCloseDialog: () => void;
  applicationId: string;
};

const AssignDialog: React.FC<Props> = ({
  openDialog,
  handleCloseDialog,
  applicationId,
}) => {
  const [reviewers, setReviewers] = useState<any[]>();
  const [selectedReviewer, setSelectedReviewer] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getReviewer()
      .then((result) => {
        setReviewers(result.data);
      })
      .catch((error) => {
        isAxiosError(error)
          ? console.error(error.response?.data)
          : console.error("Error in fetching reviewer: ", error);
      });
  }, []);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.checked) {
      setSelectedReviewer((pre) => [...pre, id]);
    } else {
      setSelectedReviewer(
        selectedReviewer.filter((reviewer) => reviewer !== id)
      );
    }
  };

  const confirmState = () => {
    if (selectedReviewer?.length !== 2) {
      toast.error("Please select two reviewers");
      return;
    }
    signApplication(
      applicationId,
      { assign: "approved", reviewers: selectedReviewer },
      () => dispatch(fetchRequestData())
    );
    handleCloseDialog();
  };

  const handleClose = () => {
    setSelectedReviewer([]);
    handleCloseDialog();
  };

  const denySign = () => {
    signApplication(applicationId, { assign: "rejected" }, () =>
      dispatch(fetchRequestData())
    );
    handleCloseDialog();
  };

  return (
    <Dialog open={openDialog} onClose={handleClose}>
      <DialogTitle>Select reviwer</DialogTitle>
      <DialogContent sx={{ p: 1, minWidth: "320px" }}>
        <List>
          {!reviewers?.length ? (
            <Typography>Couldn't find any reviewer there</Typography>
          ) : (
            reviewers.sort(objectCompare("firstName")).map((reviewer) => (
              <ListItem
                key={reviewer._id}
                color={
                  selectedReviewer == reviewer._id ? "primary" : "secondary"
                }
                divider
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Checkbox
                  onChange={(e) => handleCheck(e, reviewer._id)}
                ></Checkbox>
                <Typography>
                  {`${reviewer.firstName} ${reviewer.lastName}`.trim()}
                </Typography>
                <Typography px={2}>{reviewer.email}</Typography>
              </ListItem>
            ))
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={confirmState}
          disabled={selectedReviewer.length < 2}
        >
          Assign
        </Button>
        <Button onClick={() => denySign()} color="error">
          Deny
        </Button>
        <Button color="secondary" onClick={handleCloseDialog}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignDialog;
