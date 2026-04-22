import React, { useEffect, useMemo, useState } from "react";
import { Dashboard } from "../layouts";
import {
  Box,
  Card,
  CircularProgress,
  Container,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { CreateReport } from "./create-report";
import { BoxContainer, CustomSpinner } from "../components";
import { IReportRequest } from "../models";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { getAllPayments } from "../store/payments/paymentSlice";
import {
  getAllReportRequests,
  setSelectedReportRequestId,
} from "../store/reports/reportSlice";
import { ChangeReportStatus } from "./change-report-status";
import policeReportService from "../services/police-reports-service";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

export const ReportRequestList = () => {
  const dispatch = useAppDispatch();
  const { isGetAllReportRequestsLoading } = useAppSelector(
    (state: RootState) => state.policeReports
  );

  useEffect(() => {
    dispatch(getAllReportRequests());
  }, []);

  const [show, setShow] = useState(false);
  const toggleDrawer = () => setShow(!show);

  const handleChangeStatus = (row: any) => {
    dispatch(setSelectedReportRequestId(row));
    toggleDrawer();
  };

  const user = useAppSelector((state: RootState) => state.auth.user)

  const download = (row: any) => {
    console.log("download", row);
    row.original.PoliceReportRequestAttachmets.forEach((item: any) => {
      policeReportService.downloadPdf(user?.token!, item.filename)
      .then((response) => {
        console.log("res head", response);

        const url = window.URL.createObjectURL(new Blob([response], { type: 'application/pdf' }));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sample.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading PDF:", error);
      });
    })
  };

  const columns = useMemo<MRT_ColumnDef<IReportRequest>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        size: 150,
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 150,
      },
    ],
    []
  );
  const data: IReportRequest[] = useAppSelector(
    (state: RootState) => state.policeReports.reportRequests
  );

  if (isGetAllReportRequestsLoading) {
    return <CustomSpinner />;
  }

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
                {`Report Request List`}
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
                    onClick={() => handleChangeStatus(row)}
                  >
                    <EditIcon sx={{ color: "#2288E5" }} />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => download(row)}
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

      <Drawer open={show} onClose={toggleDrawer} anchor="right">
        <ChangeReportStatus onCloseDrawer={toggleDrawer} />
      </Drawer>
    </Dashboard>
  );
};
