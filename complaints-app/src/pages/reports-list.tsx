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
  Drawer,
  IconButton,
} from "@mui/material";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { CreateReport } from "./create-report";
import { BoxContainer, CustomSpinner } from "../components";
import { IReport, IUser } from "../models";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { getAllReports } from "../store/reports/reportSlice";
import policeReportService from "../services/police-reports-service";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { saveAs } from "file-saver";
import * as BlobUtil from "blob-util";

export const ReportsList = () => {
  const dispatch = useAppDispatch();
  const { isGetAllReportsLoading } = useAppSelector(
    (state: RootState) => state.policeReports
  );

  const user = useAppSelector((state: RootState) => state.auth.user);

  const [show, setShow] = useState(false);
  const toggleDrawer = () => setShow(!show);

  useEffect(() => {
    dispatch(getAllReports());
  }, []);

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

  const data: IReport[] = useAppSelector(
    (state: RootState) => state.policeReports.reports
  );
  const columns = useMemo<MRT_ColumnDef<IReport>[]>(
    () => [
      {
        accessorKey: "PoliceReportRequest.title",
        header: "Report Title",
        size: 150,
      },
    ],
    []
  );

  if (isGetAllReportsLoading) {
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
             <div style={{ backgroundColor: "red", backgroundImage: "linear-gradient(to right, #34b7eb , #ffffff)", padding: "20px", marginBottom: "10px", width: "70%" }}>
              <Typography variant="h5">
                {`Reports List`}
              </Typography>
            </div>
            <Button variant="contained" onClick={toggleDrawer}>
              Create Report
            </Button>
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

      <Drawer open={show} onClose={toggleDrawer} anchor="right">
        <CreateReport onCloseDrawer={toggleDrawer} />
      </Drawer>
    </Dashboard>
  );
};
