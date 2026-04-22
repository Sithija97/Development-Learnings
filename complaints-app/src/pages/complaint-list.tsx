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
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { BoxContainer, CustomSpinner } from "../components";
import { CreateComplaint } from "./create-complaint";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import {
  getAllComplaints,
  setSelectedComplaint,
} from "../store/complaints/complaintsSlice";
import { RemoveComplaint } from "./remove-complaint";
import { IComplaint } from "../models";

export const ComplaintList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isGetAllComplaintsLoading } = useAppSelector(
    (state: RootState) => state.complaints
  );

  useEffect(() => {
    dispatch(getAllComplaints());
  }, []);

  const [show, setShow] = useState(false);
  const [showRemoveDrawer, setShowRemoveDrawer] = useState(false);
  const toggleDrawer = () => setShow(!show);
  const toggleRemoveDrawer = () => setShowRemoveDrawer(!showRemoveDrawer);

  const columns = useMemo<MRT_ColumnDef<IComplaint>[]>(
    () => [
      {
        accessorKey: "User.firstName",
        header: "First Name",
        size: 100,
      },
      {
        accessorKey: "User.lastName",
        header: "Last Name",
        size: 150,
      },
      {
        accessorKey: "title",
        header: "Title",
        size: 150,
      },
      // {
      //   accessorKey: "statusId",
      //   header: "Status",
      //   size: 150,
      // },
    ],
    []
  );
  const data: IComplaint[] = useAppSelector(
    (state: RootState) => state.complaints.complaints
  );

  if (isGetAllComplaintsLoading) {
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
                {`Complaints List`}
              </Typography>
            </div>
          </Stack>

          <Card>
            <MaterialReactTable
              columns={columns}
              data={data}
              positionActionsColumn="last"
            />
          </Card>
        </Container>
      </BoxContainer>

      <Drawer open={show} onClose={toggleDrawer} anchor="right">
        {/* <CreateComplaint /> */}
      </Drawer>
      <Drawer
        open={showRemoveDrawer}
        onClose={toggleRemoveDrawer}
        anchor="right"
      >
        {/* <RemoveComplaint /> */}
      </Drawer>
    </Dashboard>
  );
};
