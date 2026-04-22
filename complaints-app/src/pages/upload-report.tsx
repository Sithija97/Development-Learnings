import React, { useEffect, useState } from "react";
import { Dashboard } from "../layouts";
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  Toolbar,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BoxContainer } from "../components";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { getAllUsers } from "../store/auth/authSlice";
import { IReportRequest, IUser } from "../models";
import {
  getAllReportRequests,
  uploadReport,
} from "../store/reports/reportSlice";

export const UploadReport = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllReportRequests());
  }, []);

  const userList: IUser[] = useAppSelector(
    (state: RootState) => state.auth.users
  );
  const policeReportRequestList: IReportRequest[] = useAppSelector(
    (state: RootState) => state.policeReports.reportRequests
  );

  const [policeReportRequestId, setPoliceReportRequestId] = useState("");
  const [userId, setUserId] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []) as File[];
    setFiles([...files, ...selectedFiles]);
  };

  const handleSubmit = () => {
    const uploadData = {
      policeReportRequestId: Number(policeReportRequestId),
      userId: Number(userId),
      fileName: files,
    };

    console.log(uploadData);
    dispatch(uploadReport(uploadData)).then((data:any)=> data.meta.requestStatus === "fulfilled" ? alert('Report uploaded Successfully!') : alert('Something went wrong.. Please try again'))

    setUserId("");
    setPoliceReportRequestId("");
    setFiles([]);
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
             <div style={{ backgroundColor: "red", backgroundImage: "linear-gradient(to right, #34b7eb , #ffffff)", padding: "20px", marginBottom: "10px", width: "100%" }}>
              <Typography variant="h5">
                {`Upload Report`}
              </Typography>
            </div>
          </Stack>

          <Card>
            <Box p={3}>
              <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                <InputLabel htmlFor="policeReportRequestId-select">
                  Police Report RequestId
                </InputLabel>
                <Select
                  label="Police Report RequestId"
                  id="policeReportRequestId-select"
                  value={policeReportRequestId}
                  onChange={(e) => setPoliceReportRequestId(e.target.value)}
                >
                  {policeReportRequestList.map((request) => (
                    <MenuItem key={request.id} value={request.id}>
                      {request.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                <InputLabel htmlFor="userId-select">User Id</InputLabel>
                <Select
                  label="User Id"
                  id="userId-select"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                >
                  {userList.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.fullName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <input
                accept=".jpeg, .jpg, .png, .pdf" // Specify allowed file types
                id="file-upload"
                type="file"
                style={{ display: "none" }}
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
