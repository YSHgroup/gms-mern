import { DashboardContent } from "@/layouts/dashboard";
import {
  Typography,
  Grid2 as Grid,
  Paper,
  Button,
  styled,
  Box,
  LinearProgress,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
} from "@mui/material";
import { CloudUpload, Publish } from "@mui/icons-material";
import React from "react";
import PDFPreview from "@/components/PdfPreviewer";
import pdf from "../../../public/php_cookbook.pdf";
import { requestGrant } from "@/services/grantService";
import { toast } from "react-toastify";
import { getAnnouncements } from "@/services/announcementServices";
import { usePathname } from "@/routes/hooks";
import { useParams } from "react-router";
import { Autocomplete } from "@mui/material";
import { currencyTypes } from "@/constants/currencyType";

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
  const [file, setFile] = React.useState<File>();
  const [fileUrl, setFileUrl] = React.useState<string>();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [announcements, setAnnouncements] = React.useState<any>([]);
  const [budget, setBudget] = React.useState<any>({
    budget: 0,
    milestone: 0,
  });
  const [currencyType, setCurrencyType] = React.useState<{
    value: string;
    label: string;
  } | null>({
    value: "dollar",
    label: "Dollar",
  });

  const params = useParams();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openCombo = Boolean(anchorEl);

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

    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }
    if (params?.id) {
      requestGrant(file, params.id, budget.budget, budget.milestone, currencyType.value);
      return;
    }
    toast.warn("Please select announcement");
  };

  const handleComboButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // React.useEffect(() => {
  //   getAnnouncements()
  //     .then((res) => {
  //       setAnnouncements(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  React.useEffect(() => {
    setLoading(false);
  }, [file]);

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Apply
      </Typography>

      {/* <Container className="bg-white border-solid border rounded border-stone-100 p-6"> */}
      <Paper elevation={1} className="p-4">
        {/* <Typography variant="body1" my={2} color="primary.dark">
          Select announcement
        </Typography>

        <Box>
          <Button
            id="basic-button"
            aria-controls={openCombo ? "basic-menu" : undefined}
            aria-haspopup="true"
            variant="outlined"
            aria-expanded={openCombo ? "true" : undefined}
            onClick={handleComboButton}
          >
            Announcement {announcement.title &&<span className="text-green-600"> - {announcement.title}</span>}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openCombo}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {announcements.map((item: any) => (
              <MenuItem key={item._id}  onClick={() => setAnnouncement(item)}>{item.title}</MenuItem>
            ))}
          </Menu>
        </Box> */}

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
                  onChange={(e) =>
                    setBudget((pre: any) => ({
                      ...pre,
                      budget: e.target.value,
                    }))
                  }
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
