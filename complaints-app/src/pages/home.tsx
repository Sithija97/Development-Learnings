import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { Dashboard } from "../layouts";
import { Card, CircularProgress } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { getAllUsers, getDashboardData } from "../store/auth/authSlice";
import { CustomSpinner } from "../components";
import { UserRoles } from "../enums";
import { backgroundImage } from "html2canvas/dist/types/css/property-descriptors/background-image";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};



const labels = ["January", "February", "March", "April", "May", "June", "July"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "My First Dataset",
      data: [65, 59, 80],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
    },
  ],
};

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Police Complaint Platform
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export const Home = () => {
  const dispatch = useAppDispatch();
  const { dashboardData, user, isDashboardDataLoading } = useAppSelector(
    (state: RootState) => state.auth
  );
  useEffect(() => {
    dispatch(getDashboardData());
    dispatch(getAllUsers());
  }, []);

  if (isDashboardDataLoading) {
    return <CustomSpinner />;
  }

  const data2 = user && user.userRoleId === UserRoles.DEFAULT ? {
    labels: ["Active Complaints", "Active Fines", "Police Reports"],
    datasets: [
      {
        label: "My First Dataset",
        data: [dashboardData?.user?.complaint?.activeComplaints || 0, dashboardData?.user?.fine?.activeFines || 0, dashboardData?.user?.policeReport?.policeReports || 0],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  } : {
    labels: ["Complaints", "Fines", "Revenue"],
    datasets: [
      {
        label: "My First Dataset",
        data: [dashboardData?.police?.complaint?.activeComplaints, dashboardData?.police?.fine?.activeFines || 0, dashboardData?.police?.revenue?.totalFineAmount || 0],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  }

  return (
    <Dashboard>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
          <div style={{ backgroundColor: "red", backgroundImage: "linear-gradient(to right, #34b7eb , #ffffff)", padding: "20px", marginBottom: "10px" }}>
            <Typography variant="h5">
              {` Hi, Welcome Back `}
            </Typography>
          </div>

          {user && user.userRoleId === UserRoles.DEFAULT && <Grid sx={{ mb: 3 }} container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ py: 5, boxShadow: 0, textAlign: "center" }}>
                <Typography variant="h3">
                  {dashboardData?.user?.complaint?.activeComplaints || 0}
                </Typography>

                <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                  Active Complaints
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ py: 5, boxShadow: 0, textAlign: "center" }}>
                <Typography variant="h3">
                  {dashboardData?.user?.fine?.activeFines || 0}
                </Typography>

                <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                  Active Fines
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ py: 5, boxShadow: 0, textAlign: "center" }}>
                <Typography variant="h3">
                  {dashboardData?.user?.policeReport?.policeReports || 0}
                </Typography>

                <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                  Police Reports
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ py: 5, boxShadow: 0, textAlign: "center" }}>
                <Typography variant="h3">
                  {dashboardData?.user?.policeReport?.allPoliceReportRequests || 0}
                </Typography>

                <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                  Police Report Requests
                </Typography>
              </Card>
            </Grid>
          </Grid>}

          {user && user.userRoleId === UserRoles.POLICE && <Grid sx={{ mb: 3 }} container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ py: 5, boxShadow: 0, textAlign: "center" }}>
                <Typography variant="h3">
                  {dashboardData?.police?.user?.userCount || 0}
                </Typography>

                <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                  Users
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ py: 5, boxShadow: 0, textAlign: "center" }}>
                <Typography variant="h3">
                  {dashboardData?.police?.complaint?.activeComplaints || 0}
                </Typography>

                <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                  Complaints
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ py: 5, boxShadow: 0, textAlign: "center" }}>
                <Typography variant="h3">
                  {dashboardData?.police?.fine?.activeFines || 0}
                </Typography>

                <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                  Fines
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ py: 5, boxShadow: 0, textAlign: "center" }}>
                <Typography variant="h3">
                  {dashboardData?.police?.revenue?.totalFineAmount || 0}
                </Typography>

                <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                  Revenue
                </Typography>
              </Card>
            </Grid>
          </Grid>}

          <Grid container spacing={3}>

            <Grid item xs={12} md={6} lg={6}>
              <Card sx={{ p: 4, boxShadow: 0 }}>
                <Doughnut data={data2} />
              </Card>
            </Grid>
          </Grid>

          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Dashboard>
  );
};
