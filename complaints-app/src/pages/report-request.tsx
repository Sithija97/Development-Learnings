import React, { useState } from "react";
import { Dashboard } from "../layouts";
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  Toolbar,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BoxContainer } from "../components";
import { useAppDispatch } from "../store/store";
import { createReportRequest } from "../store/reports/reportSlice";
import { IReportRequestData } from "../models";

export const ReportRequest = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [files, setFiles] = useState<File[]>([]); // Store an array of selected file objects

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []) as File[];
    setFiles([...files, ...selectedFiles]);
  };

  const handleSubmit = () => {
    const reportData: IReportRequestData = {
      title,
      description,
      category: Number(category),
      status: 1,
      fileName: files,
    };

    console.log(reportData);
    dispatch(createReportRequest(reportData)).then((data) => {
      if (data.meta.requestStatus === "fulfilled") {
        alert("Report Request sent Successfully !");
      } else {
        alert("Something went wrong.. Please try again");
      }
    });

    setTitle("");
    setDescription("");
    setCategory("");
    setFiles([]);
  };

  const handleDownloadClick = () => {
    const pdfUrl = "clearance_application.pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "application.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
            <div style={{ backgroundColor: "red", backgroundImage: "linear-gradient(to right, #34b7eb , #ffffff)", padding: "20px", marginBottom: "10px", width: "80%" }}>
              <Typography variant="h5">
                {` Report Request`}
              </Typography>
            </div>
            <Button variant="contained" onClick={handleDownloadClick}>
              Download Application
            </Button>
          </Stack>

          <Card>
            <Box p={3}>
              <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Title"
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>

              <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  multiline
                  rows={4}
                />
              </FormControl>

              <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                <InputLabel htmlFor="category-select">Category</InputLabel>
                <Select
                  label="Category"
                  id="category-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value={1}>Category 1</MenuItem>
                  <MenuItem value={2}>Category 2</MenuItem>
                  <MenuItem value={3}>Category 3</MenuItem>
                </Select>
              </FormControl>

              <input
                accept=".jpeg, .jpg, .png, .pdf" // Specify allowed file types
                id="file-upload"
                type="file"
                style={{ display: "none" }}
                multiple // Allow multiple file selection
                onChange={handleFileChange} // Handle file selection
              />
              <label htmlFor="file-upload">
                <Button variant="outlined" component="span" sx={{ mt: 2 }}>
                  Upload Files
                </Button>
                {files.length > 0 && (
                  <div>
                    Selected Files:
                    <ul>
                      {files.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </label>

              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ mt: 2, ml: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Card>
        </Container>
      </BoxContainer>
    </Dashboard>
  );
};
