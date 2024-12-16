import { DashboardContent } from "@/layouts/dashboard";
import { getCurrentUser } from "@/services/authService";
import { getRequests } from "@/services/grantService";
import { Box, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";

type Props = {};

const paginationModel = { page: 0, pageSize: 5 };

export default function RequestTable({}: Props) {
  const role = getCurrentUser().role;
  const columns: GridColDef[] = [
    { field: "email", headerName: "Email", flex: 1},
    { field: "name", headerName: "Full name", flex: 1 },
    {
      field: "department", headerName: "Department", flex: 1 
    },
    {
        field: "reviewer", headerName: "Reviwer",flex: 1 
    },
    {
        field: "col_dean", headerName: "College Dean",flex: 1 
    },
    {
        field: "grant_dep", headerName: "Grant Department",flex: 1 
    },
    {
        field: "grant_dir", headerName: "Grant Director", flex: 1 
    },
  ];
  const [data, setData]=useState([])

  useEffect(() => {
    getRequests().then((res) => {
        console.log("Requests fetched:", res.data);
        
        const result = res.data.map((application: any) =>{
            return {
                ...application,
                id: application._id,
                name: application.firstName + " " + application.lastName
            }
        })
        setData(result)
    }).catch((err) => {
        console.error("Error fetching requests:", err);
    });
  }, [])
  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          {role === "user" ? "My Request" : "Request list"}
        </Typography>
      </Box>

      <Paper elevation={2} className="p-4">
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Paper>
    </DashboardContent>
  );
}
