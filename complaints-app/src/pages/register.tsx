import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../store/store";
import { register } from "../store/auth/authSlice";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  nameWithInitials: Yup.string().required("Name With Initials  is required"),
  fullName: Yup.string().required("Full Name is required"),
  address: Yup.string().required("Address is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  contactNumber: Yup.string()
    .min(10, "Contact Number must be at least 10 digits")
    .max(15, "Contact Number can have at most 15 digits")
    .required("Contact Number is required"),
  nic: Yup.string().required("NIC is required"),
  userRoleId: Yup.number().required("User Role is required"),
  policeStationId: Yup.number().required("Police Station is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string().required("Confirm Password is required"),
  gender: Yup.number().required("Gender is required"),
});

export const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const InitialState = {
    firstName: "",
    lastName: "",
    nameWithInitials: "",
    fullName: "",
    address: "",
    email: "",
    contactNumber: "",
    nic: "",
    userRoleId: "",
    policeStationId: "",
    password: "",
    confirmPassword: "",
    gender: "",
  };

  const handleSubmit = (values: any) => {
    console.log("Form Values:", values);
    if (values.password !== values.confirmPassword) {
      alert("Passwords are not matching, Please check your passwords !");
    } else {
      try {
        const {
          firstName,
          lastName,
          nameWithInitials,
          fullName,
          address,
          contactNumber,
          email,
          nic,
          gender,
          userRoleId,
          policeStationId,
          password,
          filename,
        } = values;
        const user = {
          firstName,
          lastName,
          nameWithInitials,
          fullName,
          address,
          contactNumber,
          email,
          nic,
          gender: Number(gender),
          userRoleId: Number(userRoleId),
          policeStationId: Number(policeStationId),
          password,
          filename,
        };
        dispatch(register(user)).then(
          (data) => data.meta.requestStatus === "fulfilled" && navigate("/")
        );
        formik.resetForm();
      } catch (error) {
        console.log("registration error :", error);
      }
    }
  };

  const formik = useFormik({
    initialValues: InitialState,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={formik.handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={1} md={6}>
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  type="text"
                  autoComplete="firstName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  error={
                    formik.touched.firstName && formik.errors.firstName
                      ? true
                      : false
                  }
                  helperText={formik.errors.firstName}
                />
              </Grid>
              <Grid item xs={1} md={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  type="text"
                  autoComplete="lastName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  error={
                    formik.touched.lastName && formik.errors.lastName
                      ? true
                      : false
                  }
                  helperText={formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="nameWithInitials"
                  label="Name With Initials"
                  name="nameWithInitials"
                  type="text"
                  autoComplete="nameWithInitials"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.nameWithInitials}
                  error={
                    formik.touched.nameWithInitials &&
                    formik.errors.nameWithInitials
                      ? true
                      : false
                  }
                  helperText={formik.errors.nameWithInitials}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  name="fullName"
                  type="text"
                  autoComplete="fullName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fullName}
                  error={
                    formik.touched.fullName && formik.errors.fullName
                      ? true
                      : false
                  }
                  helperText={formik.errors.fullName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  type="text"
                  autoComplete="address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                  error={
                    formik.touched.address && formik.errors.address
                      ? true
                      : false
                  }
                  helperText={formik.errors.address}
                />
              </Grid>
              <Grid item xs={1} md={6}>
                <TextField
                  required
                  fullWidth
                  id="contactNumber"
                  label="Contact Number"
                  name="contactNumber"
                  type="text"
                  autoComplete="contactNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.contactNumber}
                  error={
                    formik.touched.contactNumber && formik.errors.contactNumber
                      ? true
                      : false
                  }
                  helperText={formik.errors.contactNumber}
                />
              </Grid>
              <Grid item xs={1} md={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  error={
                    formik.touched.email && formik.errors.email ? true : false
                  }
                  helperText={formik.errors.email}
                />
              </Grid>
              <Grid item xs={1} md={6}>
                <TextField
                  required
                  fullWidth
                  id="nic"
                  label="NIC"
                  name="nic"
                  type="text"
                  autoComplete="nic"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.nic}
                  error={formik.touched.nic && formik.errors.nic ? true : false}
                  helperText={formik.errors.nic}
                />
              </Grid>
              <Grid item xs={1} md={6}>
                <FormControl fullWidth required>
                  <InputLabel id="gender">Gender</InputLabel>
                  <Select
                    labelId="gender"
                    id="gender"
                    name="gender"
                    label="Gender"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.gender}
                    error={
                      formik.touched.gender && formik.errors.gender
                        ? true
                        : false
                    }
                  >
                    <MenuItem value={1}>Male</MenuItem>
                    <MenuItem value={2}>Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={1} md={6}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  error={
                    formik.touched.password && formik.errors.password
                      ? true
                      : false
                  }
                  helperText={formik.errors.password}
                />
              </Grid>
              <Grid item xs={1} md={6}>
                <TextField
                  required
                  fullWidth
                  id="confirmPassword"
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="confirmPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  error={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? true
                      : false
                  }
                  helperText={formik.errors.confirmPassword}
                />
              </Grid>
              <Grid item xs={1} md={6}>
                <FormControl fullWidth required>
                  <InputLabel id="policeStationId">Police Station</InputLabel>
                  <Select
                    labelId="policeStationId"
                    id="policeStationId"
                    name="policeStationId"
                    label="Police Station"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.policeStationId}
                    error={
                      formik.touched.policeStationId &&
                      formik.errors.policeStationId
                        ? true
                        : false
                    }
                  >
                    <MenuItem value={1}>Borella</MenuItem>
                    <MenuItem value={2}>Maharagama</MenuItem>
                    <MenuItem value={3}>Gampaha</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={1} md={6}>
                <FormControl fullWidth required>
                  <InputLabel id="userRoleId">User Role</InputLabel>
                  <Select
                    labelId="userRoleId"
                    id="userRoleId"
                    name="userRoleId"
                    label="User Role"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.userRoleId}
                    error={
                      formik.touched.userRoleId && formik.errors.userRoleId
                        ? true
                        : false
                    }
                  >
                    <MenuItem value={1}>Default</MenuItem>
                    <MenuItem value={2}>Police</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                !formik.values.firstName ||
                !formik.values.lastName ||
                !formik.values.nameWithInitials ||
                !formik.values.fullName ||
                !formik.values.address ||
                !formik.values.contactNumber ||
                !formik.values.address ||
                !formik.values.email ||
                !formik.values.nic ||
                !formik.values.userRoleId ||
                !formik.values.policeStationId ||
                !formik.values.password ||
                !formik.values.confirmPassword ||
                !formik.values.gender
              }
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
