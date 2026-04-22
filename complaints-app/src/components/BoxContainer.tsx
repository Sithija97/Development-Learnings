import { Box } from "@mui/material";
import React from "react";

interface IProps {
  children: React.ReactNode;
}

export const BoxContainer = ({ children }: IProps) => {
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        width: 800,
        overflow: "auto",
      }}
    >
      {children}
    </Box>
  );
};
