import BtnGroup from "@mui/material/ButtonGroup";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TableCell from "@mui/material/TableCell";
import { Button, Tab } from "@mui/material";
import { useAppDispatch } from "@/redux/hooks";
import {
  allowPendingUserController,
  rejectPendingUserController,
} from "@/redux/slices/pendingUserSlice";
import { ROLE } from "@/constants/info";

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

  const allowUser = (id: string) => {
    // allowPendingUser(id)
    dispatch(allowPendingUserController(id));
  };
  const rejectUser = (id: string) => {
    dispatch(rejectPendingUserController(id));
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
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

        {row.allowed ? (
          <TableCell align="center">
            <Button
              size="small"
              className="pointer-events-none"
              variant="text"
              color="primary"
            >
              Allowed
            </Button>
          </TableCell>
        ) : row.rejected ? (
          <TableCell align="center">
            <Button
              size="small"
              className="pointer-events-none"
              variant="text"
              color="error"
            >
              Rejected
            </Button>
          </TableCell>
        ) : (
          <TableCell align="center">
            <BtnGroup>
              <Button
                size="small"
                variant="contained"
                onClick={() => allowUser(row.id)}
              >
                Allow
              </Button>
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={() => rejectUser(row.id)}
              >
                Reject
              </Button>
            </BtnGroup>
          </TableCell>
        )}
      </TableRow>
    </>
  );
}
