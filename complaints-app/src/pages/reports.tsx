import React, { useEffect, useMemo, useState } from "react";
import { Dashboard } from "../layouts";
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  Toolbar,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TableFooter,
  Popover,
  MenuItem,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  Grid,
  ListItemIcon,
  ListItemText,
  Drawer,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { CreateReport } from "./create-report";
import { BoxContainer, CustomSpinner } from "../components";
import { IReportUser } from "../models";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { getReportByUser } from "../store/reports/reportSlice";
import policeReportService from "../services/police-reports-service";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

export const Reports = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const { isGetAllFinesLoading } = useAppSelector(
    (state: RootState) => state.fines
  );

  useEffect(() => {
    dispatch(getReportByUser());
  }, []);

  const [show, setShow] = useState(false);
  const toggleDrawer = () => setShow(!show);

  const columns = useMemo<MRT_ColumnDef<IReportUser>[]>(
    () => [
      {
        accessorKey: "PoliceReportRequest.title", //access nested data with dot notation
        header: "Police Report Request",
        size: 150,
      },
    ],
    []
  );
  const data: IReportUser[] = useAppSelector(
    (state: RootState) => state.policeReports.userReports
  );

  if (isGetAllFinesLoading) {
    return <CustomSpinner />;
  }

  const handleDownloadClick = (url: string) => {
    policeReportService
      .downloadPdf(user?.token!, url)
      .then((response) => {
        console.log("res head", response);

        const url = window.URL.createObjectURL(
          new Blob([response], { type: "application/pdf" })
        );
        const a = document.createElement("a");
        a.href = url;
        a.download = "sample.pdf";
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading PDF:", error);
      });
  };

  return (
    <Dashboard>
      <BoxContainer>
        <Toolbar />
        <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <div style={{ backgroundColor: "red", backgroundImage: "linear-gradient(to right, #34b7eb , #ffffff)", padding: "20px", marginBottom: "10px", width: "100%" }}>
              <Typography variant="h5">
                {`My Reports`}
              </Typography>
            </div>
          </Stack>

          <Card>
            <MaterialReactTable
              columns={columns}
              data={data}
              enableRowActions
              renderRowActions={({ row, table }) => (
                <Box sx={{ display: "flex", gap: "1rem" }}>
                  <IconButton
                    color="error"
                    onClick={() =>
                      handleDownloadClick(`${row.original.filename}`)
                    }
                  >
                    <CloudDownloadIcon sx={{ color: "#2288E5" }} />
                  </IconButton>
                </Box>
              )}
              positionActionsColumn="last"
            />
          </Card>
        </Container>
      </BoxContainer>
    </Dashboard>
  );
};
