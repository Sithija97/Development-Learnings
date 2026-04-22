import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HomeIcon from "@mui/icons-material/Home";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import DescriptionIcon from "@mui/icons-material/Description";
import SettingsIcon from "@mui/icons-material/Settings";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState, useAppSelector } from "../store/store";
import { UserRoles } from "../enums";

export const MainListItems = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector((state: RootState) => state.auth.user);

  const isTabActive = (path: string) => {
    return location.pathname === path;
  };

  const activeTabStyle = {
    backgroundColor: "#34b7eb", // Change this to the desired color for active tabs
    color: "white",
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={() => navigate("/home")} style={isTabActive("/home") ? activeTabStyle : {}}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>

      {user && user.userRoleId === UserRoles.POLICE && (
        <ListItemButton onClick={() => navigate("/users-list")} style={isTabActive("/users-list") ? activeTabStyle : {}}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>
      )
      }

      {
        user && user.userRoleId === UserRoles.DEFAULT && (
          <ListItemButton onClick={() => navigate("/reports")} style={isTabActive("/reports") ? activeTabStyle : {}}>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="My Reports" />
          </ListItemButton>
        )
      }

      {
        user && user.userRoleId === UserRoles.POLICE && (
          <ListItemButton onClick={() => navigate("/reports-list")} style={isTabActive("/reports-list") ? activeTabStyle : {}}>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Reports List" />
          </ListItemButton>
        )
      }

      {
        user && user.userRoleId === UserRoles.DEFAULT && (
          <ListItemButton onClick={() => navigate("/user-report-requests")} style={isTabActive("/user-report-requests") ? activeTabStyle : {}}>
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary="My Requests" />
          </ListItemButton>
        )
      }

      {
        user && user.userRoleId === UserRoles.POLICE && (
          <ListItemButton onClick={() => navigate("/report-request-list")} style={isTabActive("/report-request-list") ? activeTabStyle : {}}>
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary="Requests List" />
          </ListItemButton>
        )
      }

      {
        user && user.userRoleId === UserRoles.DEFAULT && (
          <ListItemButton onClick={() => navigate("/report-request")} style={isTabActive("/report-request") ? activeTabStyle : {}}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Report Requests" />
          </ListItemButton>
        )
      }

      {
        user && user.userRoleId === UserRoles.POLICE && (
          <ListItemButton onClick={() => navigate("/upload-report")} style={isTabActive("/upload-report") ? activeTabStyle : {}}>
            <ListItemIcon>
              <UploadFileIcon />
            </ListItemIcon>
            <ListItemText primary="Upload Report" />
          </ListItemButton>
        )
      }

      {
        user && user.userRoleId === UserRoles.DEFAULT && (
          <ListItemButton onClick={() => navigate("/complaints")} style={isTabActive("/complaints") ? activeTabStyle : {}}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="My Complaints" />
          </ListItemButton>
        )
      }

      {
        user && user.userRoleId === UserRoles.POLICE && (
          <ListItemButton onClick={() => navigate("/complaints-list")} style={isTabActive("/complaints-list") ? activeTabStyle : {}}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Complaints List" />
          </ListItemButton>
        )
      }

      {
        user && user.userRoleId === UserRoles.DEFAULT && (
          <ListItemButton onClick={() => navigate("/fines")} style={isTabActive("/fines") ? activeTabStyle : {}}>
            <ListItemIcon>
              <PriceChangeIcon />
            </ListItemIcon>
            <ListItemText primary="My Fines" />
          </ListItemButton>
        )
      }

      {
        user && user.userRoleId === UserRoles.POLICE && (
          <ListItemButton onClick={() => navigate("/fines-list")} style={isTabActive("/fines-list") ? activeTabStyle : {}}>
            <ListItemIcon>
              <PriceChangeIcon />
            </ListItemIcon>
            <ListItemText primary="Fines List" />
          </ListItemButton>
        )
      }

      {
        user && user.userRoleId === UserRoles.DEFAULT && (
          <ListItemButton onClick={() => navigate("/user-payments")} style={isTabActive("/user-payments") ? activeTabStyle : {}}>
            <ListItemIcon>
              <CreditCardIcon />
            </ListItemIcon>
            <ListItemText primary="My Payments" />
          </ListItemButton>
        )
      }

      {
        user && user.userRoleId === UserRoles.POLICE && (
          <ListItemButton onClick={() => navigate("/payments-list")} style={isTabActive("/payments-list") ? activeTabStyle : {}}>
            <ListItemIcon>
              <CreditCardIcon />
            </ListItemIcon>
            <ListItemText primary="Payments List" />
          </ListItemButton>
        )
      }

      {
        user && user.userRoleId === UserRoles.POLICE && (
          <ListItemButton onClick={() => navigate("/contact-info")} style={isTabActive("/contact-info") ? activeTabStyle : {}}>
            <ListItemIcon>
              <LocalPoliceIcon />
            </ListItemIcon>
            <ListItemText primary="Contact Info" />
          </ListItemButton>
        )
      }

      <ListItemButton onClick={() => navigate("/profile")} style={isTabActive("/profile") ? activeTabStyle : {}}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
    </React.Fragment >
  );
};

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
