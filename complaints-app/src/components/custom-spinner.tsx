import React from "react";
import { Box, CircularProgress } from "@mui/material";

export const CustomSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box>
        <CircularProgress />
      </Box>
    </div>
  );
};
