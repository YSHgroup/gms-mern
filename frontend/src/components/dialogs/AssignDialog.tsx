import { getReviewer } from "@/services/reviewersService";
import { objectCompare } from "@/utils/objectSort";
import { ListItem, ListItemText } from "@mui/material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  Typography,
} from "@mui/material";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";

type Props = {
  openDialog: boolean;
  handleCloseDialog: () => void;
};

const AssignDialog: React.FC<Props> = ({ openDialog, handleCloseDialog }) => {
  const [reviewers, setReviewers] = useState<any[]>();

  useEffect(() => {
    getReviewer()
      .then((result) => {
        console.log("data: ", result.data);
        setReviewers(result.data);
      })
      .catch((error) => {
        isAxiosError(error)
          ? console.error(error.response?.data)
          : console.error("Error in fetching reviewer: ", error);
      });
  }, []);
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle mb={1}>Select reviwer</DialogTitle>
      <DialogContent>
        <List>
            {!reviewers?.length ? (
              <Typography>Couldn't find any reviewer there</Typography>
            ) : (
                reviewers.sort(objectCompare('firstName')).map(reviewer => (
                    <ListItem>
                        <Typography>{`${reviewer.firstName} ${reviewer.lastName}`.trim()}</Typography>
                        <Typography>{reviewer.email}</Typography>
                    </ListItem>
                ))
            )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button color="primary">Assign</Button>
        <Button color="secondary" onClick={handleCloseDialog}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignDialog