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
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { BoxContainer, CustomSpinner } from "../components";
import { CreateComplaint } from "./create-complaint";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import {
  getComplaintsByUser,
  setSelectedComplaint,
} from "../store/complaints/complaintsSlice";
import { RemoveComplaint } from "./remove-complaint";
import { IComplaintUser } from "../models";

export const Complaints = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isGetComplaintsByUserLoading } = useAppSelector(
    (state: RootState) => state.complaints
  );

  const fetchData = async () => {
    await dispatch(getComplaintsByUser());
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const [show, setShow] = useState(false);
  const [showRemoveDrawer, setShowRemoveDrawer] = useState(false);
  const toggleDrawer = () => setShow(!show);
  const toggleRemoveDrawer = () => setShowRemoveDrawer(!showRemoveDrawer);

  const handleRemoveComplaint = (row: any) => {
    console.log("row", row.original);
    dispatch(setSelectedComplaint(row));
    toggleRemoveDrawer();
  };

  const columns = useMemo<MRT_ColumnDef<IComplaintUser>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        size: 100,
      },
      {
        accessorKey: "title",
        header: "Title",
        size: 150,
      },
      {
        accessorKey: "complaint",
        header: "Complaint",
        size: 150,
      },
      {
        accessorKey: "PoliceStation.policeStationName",
        header: "Police Station",
        size: 150,
      },
    ],
    []
  );
  const data: IComplaintUser[] = useAppSelector(
    (state: RootState) => state.complaints.userComplaints
  );

  if (isGetComplaintsByUserLoading) {
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
            <div style={{ backgroundColor: "red", backgroundImage: "linear-gradient(to right, #34b7eb , #ffffff)", padding: "20px", marginBottom: "10px", width: "80%" }}>
              <Typography variant="h5">
                {`My Complaints`}
              </Typography>
            </div>
            <Button variant="contained" onClick={toggleDrawer}>
              Create Complaint
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
                    onClick={() => handleRemoveComplaint(row)}
                  >
                    <DeleteIcon sx={{ color: "#e63946" }} />
                  </IconButton>
                </Box>
              )}
              positionActionsColumn="last"
            />
          </Card>
        </Container>
      </BoxContainer>

      <Drawer open={show} onClose={toggleDrawer} anchor="right">
        <CreateComplaint onCloseDrawer={toggleDrawer} />
      </Drawer>

      <Drawer
        open={showRemoveDrawer}
        onClose={toggleRemoveDrawer}
        anchor="right"
      >
        <RemoveComplaint onCloseDrawer={toggleRemoveDrawer} />
      </Drawer>
    </Dashboard>
  );
};
