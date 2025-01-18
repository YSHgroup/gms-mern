import { Link, Typography } from "@mui/material";
import { MenuList, Popover } from "@mui/material";
import MenuItem, { menuItemClasses } from "@mui/material/MenuItem";
import React from "react";

type Props = {
  rowData: any;
  openPopover: HTMLButtonElement | null;
  handleClosePopover: () => void;
};

const DocPopover: React.FC<Props> = ({
  rowData,
  openPopover,
  handleClosePopover,
}) => {
  return (
    <Popover
      open={!!openPopover}
      anchorEl={openPopover}
      onClose={handleClosePopover}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
        <Typography variant="subtitle1" borderBottom={1} p={1} textAlign={'center'} color="primary">
            Application Documents
        </Typography>
      <MenuList
        disablePadding
        sx={{
          p: 0.5,
          gap: 0.5,
          display: "flex",
          overflowX: 'auto',
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
        <MenuItem >
          <Link
            href={`${import.meta.env.VITE_BASE_URL}/application/${
              rowData["application"]
            }`}
            color="info"
            target="_blank"
          >
            {rowData["application"]}
          </Link>
        </MenuItem>
        {rowData["additionalDoc"]?.length &&
          rowData["additionalDoc"].map((doc: string) => (
            <MenuItem  key={doc}>
              <Link
              color="info"
                href={`${import.meta.env.VITE_BASE_URL}/additional_doc/${doc}`}
                target="_blank"
              >
                {doc}
              </Link>
            </MenuItem>
          ))}
      </MenuList>
    </Popover>
  );
};

export default DocPopover;