import { submitAdditionalDoc } from "@/services/grantService";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  styled,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  applicationId: string;
  openDialog: boolean;
  handleDialogClose: () => void;
};

const FileInput = styled("input")({
  border: "1px solid grey",
  borderRadius: 5,
  padding: 2,
});

const AddDocDialog: React.FC<Props> = ({
  applicationId,
  openDialog,
  handleDialogClose,
}) => {
  const [doc, setDoc] = useState<File | null>();

  const uploadFile = (file: FileList | null) => {
    if (!file) return;
    setDoc(file[0]);
  };

  const submitDoc = () => {
    if (!doc) return;
    submitAdditionalDoc(applicationId, doc)
      .then(() => {
        toast.success("Submitted successfully");
      })
      .catch((error) => {
        console.error("Error submitting doc: ", error);
        toast.error("Failed to submit");
      });
  };
  const closeDialog = () => {
    handleDialogClose();
    setDoc(null);
  };

  return (
    <Dialog open={openDialog} onClose={handleDialogClose}>
      <DialogTitle mb={1}>Upload additional Document</DialogTitle>
      <DialogContent>
        <Box>
          <FileInput
            type="file"
            name="document"
            accept="application/pdf"
            onChange={(e) => uploadFile(e.target.files)}
          ></FileInput>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={submitDoc} color="primary">
          Submit
        </Button>
        <Button onClick={closeDialog} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDocDialog;
