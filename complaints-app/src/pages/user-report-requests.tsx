import React, { useEffect, useMemo, useState } from "react";
import { Dashboard } from "../layouts";
import {
  Box,
  Card,
  CircularProgress,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { CreateReport } from "./create-report";
import { BoxContainer, CustomSpinner } from "../components";
import { IReportRequestUser } from "../models";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { getReportRequestByUser } from "../store/reports/reportSlice";

export const UserReportRequestList = () => {
  const dispatch = useAppDispatch();
  const { isGetReportRequestByUserLoading } = useAppSelector(
    (state: RootState) => state.policeReports
  );

  useEffect(() => {
    dispatch(getReportRequestByUser());
  }, []);

  const [show, setShow] = useState(false);
  const toggleDrawer = () => setShow(!show);

  const columns = useMemo<MRT_ColumnDef<IReportRequestUser>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        size: 150,
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 400,
      },
      // {
      //   accessorKey: "category",
      //   header: "Category",
      //   size: 200,
      // },
    ],
    []
  );
  const data: IReportRequestUser[] = useAppSelector(
    (state: RootState) => state.policeReports.userReportRequests
  );

  if (isGetReportRequestByUserLoading) {
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
                {` My Report Requests`}
              </Typography>
            </div>
          </Stack>

          <Card>
            <MaterialReactTable columns={columns} data={data} />
          </Card>
        </Container>
      </BoxContainer>
    </Dashboard>
  );
};
