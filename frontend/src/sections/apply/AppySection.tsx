import { DashboardContent } from "@/layouts/dashboard";
import {
  Typography,
  Grid2 as Grid,
  Paper,
  Button,
  styled,
  Box,
  LinearProgress,
} from "@mui/material";
import { CloudUpload, Publish } from "@mui/icons-material";
import React from "react";
import PDFPreview from "@/components/PdfPreviewer";
import pdf from "../../../public/php_cookbook.pdf";

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

  const imageUpload = (files: FileList | null) => {
    if (files && files.length > 0) {
      console.log(files);
      setFile(files[0]);

      const filePath = URL.createObjectURL(files[0]);
      setFileUrl(filePath);
    }
  };

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Apply
      </Typography>

      {/* <Container className="bg-white border-solid border rounded border-stone-100 p-6"> */}
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
                  onChange={(event) => imageUpload(event.target.files)}
                />
              </Button>
            </Grid>
            {fileUrl && (
              <Grid
                size={{ sm: 6, xs: 12 }}
                display="flex"
                justifyContent={"center"}
              >
                <Button variant="contained" startIcon={<Publish />}>
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
