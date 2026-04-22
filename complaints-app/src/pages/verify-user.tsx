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
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../store/store";
import { verify } from "../store/auth/authSlice";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const validationSchema = Yup.object().shape({
  secretCode: Yup.number().required("Secret Code is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string().required("Confirm Password is required"),
});

export const VerifyUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const InitialState = {
    secretCode: 0,
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values: any) => {
    if (values.password !== values.confirmPassword) {
      alert("Passwords are not matching, Please check your passwords !");
    } else {
      const queryParams = new URLSearchParams(window.location.search);
      const email: string | null = queryParams.get("email") || "";

      const { secretCode, password } = values;

      const data = {
        secretCode,
        email,
        password,
      };

      dispatch(verify(data)).then((data) => {
        if (data.meta.requestStatus === "fulfilled") {
          navigate("/");
        }
      });
      formik.resetForm();
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
            Verify User
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={formik.handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="secretCode"
                  label="Secret Code"
                  name="secretCode"
                  type="number"
                  autoComplete="secretCode"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.secretCode}
                  error={
                    formik.touched.secretCode && formik.errors.secretCode
                      ? true
                      : false
                  }
                  helperText={formik.errors.secretCode}
                />
              </Grid>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                !formik.values.secretCode ||
                !formik.values.password ||
                !formik.values.confirmPassword
              }
            >
              Reset Password
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
