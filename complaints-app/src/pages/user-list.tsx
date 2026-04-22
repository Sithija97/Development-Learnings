import React, { useEffect, useMemo, useState } from "react";
import { Dashboard } from "../layouts";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { BoxContainer, CustomSpinner } from "../components";
import { IUser } from "../models";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { getAllUsers } from "../store/auth/authSlice";

export const UsersList = () => {
  const dispatch = useAppDispatch();
  const { isGetAllUsersLoading } = useAppSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const columns = useMemo<MRT_ColumnDef<IUser>[]>(
    () => [
      {
        accessorKey: "firstName", //access nested data with dot notation
        header: "First Name",
        size: 150,
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
        size: 150,
      },
      {
        accessorKey: "contactNumber", //normal accessorKey
        header: "Contact Number",
        size: 200,
      },
      {
        accessorKey: "nic",
        header: "NIC",
        size: 150,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 150,
      },
    ],
    []
  );
  const data: IUser[] = useAppSelector((state: RootState) => state.auth.users);

  if (isGetAllUsersLoading) {
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
                {`Users`}
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
