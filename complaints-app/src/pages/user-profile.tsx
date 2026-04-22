import React, { useEffect, useState } from "react";
import {
  Avatar,
  Typography,
  Grid,
  Paper,
  Toolbar,
  Container,
  Stack,
  Card,
  TextField,
  Button,
} from "@mui/material";
import { Dashboard } from "../layouts";
import { BoxContainer } from "../components";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { update, uploadProfileImg } from "../store/auth/authSlice";
import { IUpdateData } from "../models";
import policeReportService from "../services/police-reports-service";
import authService from "../services/auth-service";

const UserProfile = () => {

  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const user_test = {
    firstName: "John",
    lastName: "Doe",
    nameWithInitials: "",
    fullName: "John Doe",
    userRoleId: 1,
    policeStationId: 2,
    avatarUrl: "https://example.com/user-avatar.jpg",
    address: "123 Main St, City, Country",
    contactNumber: "+1 (123) 456-7890",
  };

  useEffect(() => {
    if (user?.filename) {
      authService
        .getImage(user?.token!, user.filename)
        .then((response) => {
          console.log("res head", response);
          setSelectedImage(response)
        })
    }
  }, []);

  const [firstName, setFirstName] = useState(
    user?.firstName || user_test.firstName
  );
  const [lastName, setLastName] = useState(
    user?.lastName || user_test.lastName
  );
  const [nameWithInitials, setNameWithInitials] = useState(
    user?.nameWithInitials || user_test.nameWithInitials
  );
  const [fullName, setFullName] = useState(
    user?.fullName || user_test.fullName
  );

  const [address, setAddress] = useState(user?.address || user_test.address);
  const [contactNumber, setContactNumber] = useState(
    user?.contactNumber || user_test.contactNumber
  );
  const [selectedImage, setSelectedImage] = useState(user?.filename || null || Blob);

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    const data = {
      filename: file,
    };
    dispatch(uploadProfileImg(data));
  };

  const handleSaveClick = () => {
    const updatedUser: IUpdateData = {
      firstName,
      lastName,
      nameWithInitials,
      fullName,
      address,
      contactNumber,
    };

    if (selectedImage) {
      const formData = new FormData();
      formData.append("avatar", selectedImage);

      fetch("/upload-profile-picture", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Image uploaded:", data);
          dispatch(uploadProfileImg(data));
        })
        .catch((error) => {
          console.error("Image upload failed:", error);
        });
    }

    console.log("Updated user:", updatedUser);
    dispatch(update(updatedUser));
  };

  return (
    <Dashboard>
      <BoxContainer>
        <Toolbar />
        <Container maxWidth={"md"} sx={{ mt: 4, mb: 4 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          ></Stack>

          <Card>
            <Paper
              elevation={3}
              style={{ padding: "16px", textAlign: "center" }}
            >
              <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
                <Avatar
                  alt={`${firstName} ${lastName}`}
                  src={
                    selectedImage instanceof Blob
                      ? URL.createObjectURL(selectedImage)
                      : user_test.avatarUrl
                  }
                  sx={{ width: 90, height: 90, margin: "0 auto" }}
                />
              </label>

              <input
                id="image-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
              <Typography variant="h5" gutterBottom>
                {`${firstName} ${lastName}`}
              </Typography>
              <Typography variant="body1">{`Address: ${address}`}</Typography>
              <Typography variant="body1">{`Contact Number: ${contactNumber}`}</Typography>

              <div>
                <TextField
                  label="First Name"
                  variant="outlined"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Last Name"
                  variant="outlined"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Name with Initials"
                  variant="outlined"
                  value={nameWithInitials}
                  onChange={(e) => setNameWithInitials(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Full Name"
                  variant="outlined"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Address"
                  variant="outlined"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Contact Number"
                  variant="outlined"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  fullWidth
                  margin="normal"
                />

                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleSaveClick}
                >
                  Update Profile
                </Button>
              </div>
            </Paper>
          </Card>
        </Container>
      </BoxContainer>
    </Dashboard>
  );
};

export { UserProfile };
