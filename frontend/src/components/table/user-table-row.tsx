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
  DialogTitle,
  Link,
  Typography,
} from "@mui/material";
import { Button } from "@mui/material";
import { getCurrentUser } from "@/services/authService";

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
  onSelectRow,
  onAccept,
  onDeny,
}: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(
    null
  );
  const [state, setState] = useState<boolean | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const user = getCurrentUser();

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
      onAccept(state, id);
      setOpenDialog(false);
      setState(null);
    }
  };
  const cancelAction = (id: string) => {
    onDeny(state, id);
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
                "reviewer",
                "signed",
                "col_dean",
                "grant_dep",
                "grant_dir",
                "accepted",
              ].includes(headItem.id)
                ? "center"
                : "left"
            }
          >
            <>
              {[
                "reviewer",
                "signed",
                "col_dean",
                "grant_dep",
                "grant_dir",
                "accepted",
              ].includes(headItem.id) ? (
                row[headItem.id] == true ? (
                  <Iconify
                    width={22}
                    icon="solar:check-circle-bold"
                    sx={{ color: "success.main" }}
                  />
                ) : row[headItem.id] == false ? (
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

        {(user.role !== "super_admin" &&
          user.role !== "user") && (
            <TableCell align="right">
              <IconButton onClick={handleOpenPopover}>
                <Iconify icon="eva:more-vertical-fill" />
              </IconButton>
            </TableCell>
          )}

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
              width: 140,
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
            <MenuItem
              onClick={handleAcceptClick}
              sx={{ color: "success.main" }}
            >
              <Iconify icon="solar:check-circle-broken" />
              Accept
            </MenuItem>

            <MenuItem onClick={handleDenyClick} sx={{ color: "error.main" }}>
              <Iconify icon="solar:forbidden-circle-broken" />
              Deny
            </MenuItem>
          </MenuList>
        </Popover>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle mb={1}>Confirm action</DialogTitle>
          <Typography p={2}>
            Are you sure you want to {state ? "accept" : "deny"} this
            application?
          </Typography>
          <DialogActions>
            <Button onClick={() => confirmState(row.id)} color="primary">
              Yes
            </Button>
            <Button onClick={() => cancelAction(row.id)} color="secondary">
              No
            </Button>
          </DialogActions>
        </Dialog>
      </TableRow>
    </>
  );
}
