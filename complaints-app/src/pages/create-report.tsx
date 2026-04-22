import React, { useState, useRef } from "react";
import { Dashboard } from "../layouts";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { BoxContainer, RichtextEditor } from "../components";

interface IProps {
  onCloseDrawer: () => void;
}

export const CreateReport = ({ onCloseDrawer }: IProps) => {
  const [policeReportContent, setPoliceReportContent] = useState("");
  const reportTemplateRef = useRef(null);

  const handleReportContent = async () => {
    const input = reportTemplateRef.current!;
    html2canvas(input).then((canvas: any) => {
      const imgData = canvas.toDataURL(`image/png`);
      const pdf = new jsPDF(`p`, `px`, `a4`, true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save(`report.pdf`);
    });
    onCloseDrawer();
  };

  return (
    <BoxContainer>
      <Container>
        <Typography sx={{ mt: 12, mb: 5 }} variant="h5" gutterBottom>
          Create Report
        </Typography>

        <Grid sx={{ mt: 1 }} container spacing={2}>
          <RichtextEditor
            setValue={setPoliceReportContent}
            reportTemplateRef={reportTemplateRef}
          />
        </Grid>

        <Button
          sx={{ mt: 3, mb: 2, ms: 3 }}
          variant="contained"
          onClick={handleReportContent}
        >
          Save
        </Button>
      </Container>
    </BoxContainer>
  );
};
