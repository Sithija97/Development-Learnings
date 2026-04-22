import React, { useEffect, useMemo, useState } from "react";
import { Dashboard } from "../layouts";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import AddCardIcon from "@mui/icons-material/AddCard";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { CreateReport } from "./create-report";
import { BoxContainer, CustomSpinner } from "../components";
import { CreateFine } from "./create-fine";
import { IFineUser } from "../models";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { getFinesByUser, setSelectedFineId } from "../store/fines/fineSlice";
import { useNavigate } from "react-router-dom";

export const Fines = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isGetFinesByUserLoading } = useAppSelector(
    (state: RootState) => state.fines
  );

  useEffect(() => {
    dispatch(getFinesByUser());
  }, []);

  const [show, setShow] = useState(false);
  const toggleDrawer = () => setShow(!show);

  const handlePayment = (row: any) => {
    dispatch(setSelectedFineId(row));
    navigate("/payment");
  };

  const columns = useMemo<MRT_ColumnDef<IFineUser>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        size: 150,
      },
      {
        accessorKey: "amount",
        header: "Amount",
        size: 150,
      },
      {
        accessorKey: "tax",
        header: "Tax",
        size: 150,
      },
      {
        accessorKey: "otherCharges",
        header: "Other Charges",
        size: 150,
      },
    ],
    []
  );
  const data: IFineUser[] = useAppSelector(
    (state: RootState) => state.fines.userFines
  );

  if (isGetFinesByUserLoading) {
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
                {`My Fines`}
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
                  <IconButton color="error" onClick={() => handlePayment(row)}>
                    <AddCardIcon sx={{ color: "#2288E5" }} />
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
