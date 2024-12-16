import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from '@/components/iconify';
import { Box, Button, Dialog, DialogTitle, Stack } from '@mui/material';
import { Check } from '@mui/icons-material';
import { useState } from 'react';
import { DialogActions } from '@mui/material';

// ----------------------------------------------------------------------

type UserTableToolbarProps = {
  numSelected: number;
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onButtonAction: (value: any) => void;
};

export function UserTableToolbar({ numSelected, filterName, onFilterName, onButtonAction }: UserTableToolbarProps) {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<boolean | null>(null)
  const clickAllow = () => {
    setOpen(true);
    setState(true)
  };
  const clickDeny = () => {
    setOpen(true);
    setState(false)
  };
  const confirmState = () => {
    if(open) {
      onButtonAction(state)
      setOpen(false);
      setState(null);
    }
  }
  const cancelAction = () => {
    setOpen(false);
    setState(null);
  }
  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <OutlinedInput
          fullWidth
          value={filterName}
          onChange={onFilterName}
          placeholder="Search user..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify width={20} icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
          sx={{ maxWidth: 320 }}
        />
      )}

      {numSelected > 0 ? (
        <Stack direction={'row'}>
        <Tooltip title="Allow selected users">
          <IconButton onClick={clickAllow}>
            <Check color='success'></Check>
          </IconButton>
        </Tooltip>
        <Tooltip title="Reject selected users">
          <IconButton onClick={clickDeny}>
            <Iconify color={'red'} icon="solar:trash-bin-trash-bold" />
          </IconButton>
        </Tooltip>
        </Stack>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            {/* <Iconify icon="ic:round-filter-list" /> */}
          </IconButton>
        </Tooltip>
      )}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm action</DialogTitle>
        <Box p={2}>
          <Typography>Are you sure you want to {state? "allow": "reject"} these users?</Typography>
        </Box>
        <DialogActions>
          <Button onClick={confirmState} color="primary">
            Yes
          </Button>
          <Button onClick={cancelAction} color="secondary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Toolbar>
  );
}
