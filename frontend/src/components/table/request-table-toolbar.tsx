import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { useMediaQuery, useTheme } from "@mui/material";

import { Iconify } from "@/components/iconify";
import { Box, Button, Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { useState } from "react";

// ----------------------------------------------------------------------

type UserTableToolbarProps = {
  numSelected: number;
  announcements: any[];
  filterName: string;
  onFilterName: (filterName: string) => void;
  filterByAnnouncement: Function;
};

export function UserTableToolbar({
  numSelected,
  filterName,
  announcements,
  filterByAnnouncement,
  onFilterName,
}: UserTableToolbarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openCombo = Boolean(anchorEl);
  const [announcement, setAnnouncement] = useState<any>([]);

  const theme = useTheme();

  const sxDown = useMediaQuery(theme.breakpoints.down("sm"));

  const handleComboButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const selectAnnouncement = (item: Record<string, any>) => {
    setAnnouncement(item);
    filterByAnnouncement(item._id);
  };

  return (
    <Toolbar
      sx={{
        height: 96,
        display: "flex",
        justifyContent: "space-between",
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
      }}
    >
      <OutlinedInput
        fullWidth
        value={filterName}
        onChange={(e) => onFilterName(e.target.value)}
        placeholder="Search user..."
        startAdornment={
          <InputAdornment position="start">
            <Iconify
              width={20}
              icon="eva:search-fill"
              sx={{ color: "text.disabled" }}
            />
          </InputAdornment>
        }
        sx={{ maxWidth: 320 }}
      />

      <Box mb={2}>
        <Button
          id="basic-button"
          aria-controls={openCombo ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openCombo ? "true" : undefined}
          onClick={handleComboButton}
          variant="outlined"
        >
          {sxDown ? (
            <IconButton size="small">
              <Iconify icon="ic:round-filter-list" />
            </IconButton>
          ) : (
            <>
              Announcement{" "}
              {announcement.title && (
                <span className="text-green-600"> - {announcement.title}</span>
              )}
            </>
          )}
        </Button>
        <Typography></Typography>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openCombo}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => selectAnnouncement({ _id: "" })}>
            All
          </MenuItem>
          {announcements.map((item: any) => (
            <MenuItem key={item._id} onClick={() => selectAnnouncement(item)}>
              {item.title}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="solar:trash-bin-trash-bold" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      )} */}
    </Toolbar>
  );
}
