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

export const ContactInfo = () => {
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

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "range",
        header: "Range",
        size: 180,
      },
      {
        accessorKey: "division",
        header: "Division",
        size: 180,
      },
      {
        accessorKey: "desk",
        header: "Desk",
        size: 180,
      },
      {
        accessorKey: "telephoneNumber",
        header: "Telephone Number",
        size: 180,
      },
    ],
    []
  );
  const data = [
    {
      range: "Eastern Range South",
      division: "Ampara",
      desk: "Emergency /Ops",
      telephoneNumber: "0632222321",
    },
    {
      range: "North Central Range",
      division: "Anuradhapura",
      desk: "Range Ops Room",
      telephoneNumber: "0252222788",
    },
    {
      range: "North Central Range",
      division: "Anuradhapura",
      desk: "Ops Room",
      telephoneNumber: "0252222124",
    },
    {
      range: "Uva Range",
      division: "Badulla",
      desk: "Emergency /Ops",
      telephoneNumber: "0552222219",
    },
    {
      range: "Eastern Range South",
      division: "Batticoloa",
      desk: "Emergency /Ops",
      telephoneNumber: "0652224404",
    },
    {
      range: "North Western Range",
      division: "Chilaw",
      desk: "Ops Room",
      telephoneNumber: "0322220752",
    },
    {
      range: "Colombo",
      division: "Colombo",
      desk: "Emergency",
      telephoneNumber: "0112433333",
    },
    {
      range: "Colombo",
      division: "Colombo",
      desk: "Emergency",
      telephoneNumber: "0112422521",
    },
    {
      range: "Colombo",
      division: "Colombo",
      desk: "Emergency",
      telephoneNumber: "0112446736",
    },
    {
      range: "Southern Range",
      division: "Elpitiya",
      desk: "Ops Room",
      telephoneNumber: "0912291222",
    },
    {
      range: "Southern Range",
      division: "Galle",
      desk: "Emergency",
      telephoneNumber: "0912233333",
    },
    {
      range: "Southern Range",
      division: "Galle",
      desk: "Ops Room",
      telephoneNumber: "0912222222",
    },
    {
      range: "Western Province- North Range",
      division: "Gampaha",
      desk: "Ops Room",
      telephoneNumber: "0332222223",
    },
  ];

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
                {`Police Contact Information`}
              </Typography>
            </div>
          </Stack>

          <div className="background-image"></div>

          <Card>
            <MaterialReactTable columns={columns} data={data} />
          </Card>
        </Container>
      </BoxContainer>
    </Dashboard>
  );
};
