import {
  Grid2 as Grid,
  Button,
  styled,
  Box,
  TextField,
  Divider,
  InputAdornment,
} from "@mui/material";
import { _tasks, _posts, _timeline } from "@/_mock";
import { CloudUpload } from "@mui/icons-material";

import React from "react";
import { Label } from "@/components/label";
import { publishAnnouncement } from "@/services/announcementServices";

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
  const [imgUrl, setImgUrl] = React.useState<string>();
  const [img, setImg] = React.useState<File>();
  const [title, setTitle] = React.useState<string>();
  const [date, setDate] = React.useState<any>({
    from: "",
    until: "",
  });
  const [budget, setBudget] = React.useState<number>()
  const [content, setContent] = React.useState<string>();
  const imageUpload = (files: FileList | null) => {
    if (files && files.length > 0) {
      console.log(files);
      setImg(files[0]);

      const imageUrl = URL.createObjectURL(files[0]);
      setImgUrl(imageUrl);
    }
  };

  const removeImage = () => {
    setImgUrl(undefined);
    setImg(undefined);
  };

  const submitAnnouncement = () => {
    if (!title || !content || !date) return;

    const data = {
      title,
      content,
      from: date.from,
      until: date.until,
      budget
    };
    publishAnnouncement(data, img);
  };

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <TextField
          label="Title"
          variant="outlined"
          multiline
          fullWidth
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
          onChange={(e) =>
            setDate((pre: any) => ({ ...pre, until: e.target.value }))
          }
        ></TextField>
      </Grid>

      <Grid container size={12}>
        <Grid size={{ sm: 4, xs: 12 }}>
          <TextField
            label="Budget"
            variant="outlined"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              input: {
                endAdornment: <InputAdornment position="end">$</InputAdornment>,
              },
            }}
            fullWidth
            type="number"
            onChange={(e) =>
              setBudget((pre: any) => ({ ...pre, budget: e.target.value }))
            }
          ></TextField>
        </Grid>
        <Grid size={ 4 }>
        </Grid>
        <Grid size={4}></Grid>
      </Grid>

      <Grid size={12}>
        {/* <Label>Text Content: </Label> */}
        <TextField
          label="Text Content"
          multiline
          minRows={4}
          fullWidth
          margin="normal"
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
