import { DashboardContent } from "@/layouts/dashboard";
import { getCurrentUser } from "@/services/authService";
import {
  approveRequest,
  getRequests,
  rejectRequest,
} from "@/services/grantService";
import {
  Box,
  Card,
  Paper,
  Table,
  TableContainer,
  TablePagination,
  Typography,
  Menu,
  Button,
  MenuItem,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Scrollbar } from "@/components/scrollbar";
import { UserTableHead } from "@/components/table/user-table-head";
import { UserTableToolbar } from "@/components/table/user-table-toolbar";
import { TableBody } from "@mui/material";
import { UserTableRow } from "@/components/table/user-table-row";
import { TableEmptyRows } from "@/components/table/table-empty-rows";
import { TableNoData } from "@/components/table/table-no-data";
import { applyFilter, emptyRows, getComparator } from "../tableUtils/utils";
import { toast } from "react-toastify";
import axios, { isAxiosError } from "axios";
import { getAnnouncements } from "@/services/announcementServices";

type Props = {};

const setTableData = (setData: React.Dispatch<any>) => {
  getRequests()
    .then((res) => {
      console.log("Requests fetched:", res.data);

      const result = res.data.map((application: any) => {
        return {
          ...application,
          id: application._id,
          name: application.firstName + " " + application.lastName,
        };
      });
      setData(result);
    })
    .catch((err) => {
      console.error("Error fetching requests:", err);
    });
};

export default function RequestTable({}: Props) {
  const role = getCurrentUser().role;
  const columns: any[] = [
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
    {
      id: "department",
      label: "Department",
    },
    {
      id: "application",
      label: "Application",
    },
    {
      id: "signed",
      label: "Signed",
    },
    {
      id: "reviewer",
      label: "Reviwer",
    },
    {
      id: "col_dean",
      label: "College Dean",
    },
    {
      id: "grant_dep",
      label: "Grant Department",
    },
    {
      id: "grant_dir",
      label: "Grant Director",
    },
    {
      id: "accepted",
      label: "Accepted",
    },
  ];
  const [data, setData] = useState<any>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openCombo = Boolean(anchorEl);
  const [announcements, setAnnouncements] = useState<any>([]);
  const [announcement, setAnnouncement] = useState<any>([]);

  //
  const table = useTable();

  const [filterName, setFilterName] = useState("");

  const dataFiltered: any[] = applyFilter({
    inputData: data,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;
  //

  const handleAccept = (id: string) => {
    console.log("handleAccept: ", id);
    approveRequest(id)
      .then((response) => {
        toast.success("Application approved");
        setTableData(setData);
      })
      .catch((error) => {
        console.log("err: ", error);
        if (isAxiosError(error))
          error.response?.data.msg.map((str: string) => {
            toast.error(str);
          });
      });
  };

  const handleDeny = (id: string) => {
    console.log("handleDeny: ");
    rejectRequest(id)
      .then((response) => {
        toast.success("Application rejected");
        setTableData(setData);
      })
      .catch((error) => {
        if (isAxiosError(error))
          error.response?.data.msg.map((str: string) => {
            toast.error(str);
          });
      });
  };

  const handleComboButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const selectAnnouncement = (item: string) => {
    setAnnouncement(item)
  }

  useEffect(() => {
    setTableData(setData);
    getAnnouncements()
      .then((res) => {
        setAnnouncements(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // getComments()
  }, []);
  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          {role === "user" ? "My Request" : "Request list"}
        </Typography>
        <Typography variant="h5">{}</Typography>
      </Box>

        <Box mb={2}>
          <Button
            id="basic-button"
            aria-controls={openCombo ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openCombo ? "true" : undefined}
            onClick={handleComboButton}
            variant="outlined"
          >
            Announcement {announcement.title &&<span className="text-green-600"> - {announcement.title}</span>}
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
            {announcements.map((item: any) => 
              <MenuItem key={item._id} onClick={() => setAnnouncement(item)}>{item.title}</MenuItem>
            )}
          </Menu>
        </Box>
      <Card>
        <UserTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={data.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    data.map((user: any) => user?.id)
                  )
                }
                headLabel={columns}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <UserTableRow
                      headList={columns}
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      onAccept={handleAccept}
                      onDeny={handleDeny}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(
                    table.page,
                    table.rowsPerPage,
                    data.length
                  )}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={data.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState("name");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback(
    (checked: boolean, newSelecteds: string[]) => {
      if (checked) {
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    },
    []
  );

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
