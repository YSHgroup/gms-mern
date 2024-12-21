import BtnGroup from "@mui/material/ButtonGroup";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TableCell from "@mui/material/TableCell";
import { Box, Button, Dialog, DialogActions, DialogTitle, Tab } from "@mui/material";
import { useAppDispatch } from "@/redux/hooks";
import {
  allowPendingUserController,
  rejectPendingUserController,
} from "@/redux/slices/pendingUserSlice";
import { ROLE } from "@/constants/info";
import { getCurrentUser } from "@/services/authService";
import { useState } from "react";

// ----------------------------------------------------------------------

type UserTableRowProps<T> = {
  row: T;
  headList: any[];
  selected: boolean;
  onSelectRow: () => void;
};

export function UserTableRow({
  row,
  headList,
  selected,
  onSelectRow,
}: UserTableRowProps<any>) {
  const dispatch = useAppDispatch();
  const user = getCurrentUser()
  const [dialog, setDialog] = useState(false)
  const [action, setAction] = useState<'allow' | 'reject' | null>(null)

  const handleConfirm = (id: string) => {
    if(action == 'allow') {

      dispatch(allowPendingUserController(id));
    } else if(action == 'reject') {
      dispatch(rejectPendingUserController(id));
    }
    setDialog(false)
  }

  const allowUser = () => {
    // allowPendingUser(id)
    console.log('allow : ', action)
    setAction('allow')
    setDialog(true)
  };
  const rejectUser = () => {
    setAction('reject')
    setDialog(true)
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          {row.allowed || row.rejected ?  <></>: <Checkbox disableRipple checked={selected} onChange={onSelectRow} />}
        </TableCell>

        {headList.map((headItem) => (
          <TableCell key={row[headItem.id]}>
            <>
              {headItem.id == "role"
                ? ROLE.find((role) => role.id === row["role"])?.name
                : row[headItem.id]}
            </>
          </TableCell>
        ))}

        {
        // (user.role != 'grant_dir') && row.allowed ? (
        //   <TableCell align="center">
        //     <Button
        //       size="small"
        //       className="pointer-events-none"
        //       variant="text"
        //       color="primary"
        //     >
        //       Allowed
        //     </Button>
        //   </TableCell>
        // ) : (user.role != 'grant_dir') && row.rejected ? (
        //   <TableCell align="center">
        //     <Button
        //       size="small"
        //       className="pointer-events-none"
        //       variant="text"
        //       color="error"
        //     >
        //       Rejected
        //     </Button>
        //   </TableCell>
        // ) : (
          <TableCell align="center">
            <BtnGroup>
              <Button
                size="small"
                variant={row.allowed? "outlined": "contained"}
                onClick={allowUser}
                disabled={row.allowed}
              >
                {row.allowed? "Allowed": "Allow"}
              </Button>
              <Button
                size="small"
                variant={row.rejected? "outlined": "contained"}
                color="error"
                onClick={rejectUser}
                disabled={row.rejected}
              >
                {row.rejected? "Rejected": "Reject"}
              </Button>
            </BtnGroup>
          </TableCell>
        }
        <Dialog open={dialog} onClose={() => setDialog(false)}>
          <DialogTitle>Do you want to {action} this user?</DialogTitle>
          <DialogActions>
            <Button color="primary" size="large" onClick={() => handleConfirm(row.id)}>Confirm</Button>
            <Button color="secondary" size="large" onClick={() => setDialog(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </TableRow>
    </>
  );
}
