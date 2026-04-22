import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Appbar, Sidebar } from "../components";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

interface IProps {
  children: React.ReactNode;
}

export const Dashboard = ({ children }: IProps) => {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Appbar open={open} toggleDrawer={toggleDrawer} />
        <Sidebar open={open} toggleDrawer={toggleDrawer} />
        {children}
      </Box>
    </ThemeProvider>
  );
};
