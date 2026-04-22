import React, { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { BoxContainer } from "../components";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { changeReportStatus } from "../store/reports/reportSlice";

interface IProps {
  onCloseDrawer: () => void
}

export const ChangeReportStatus = ({ onCloseDrawer }: IProps) => {
  const dispatch = useAppDispatch();

  const selectedReportRequestId = useAppSelector(
    (state: RootState) => state.policeReports.selectedReportRequestId
  );
  console.log("selectedReportRequestId", selectedReportRequestId)
  const reportRequestList = useAppSelector(
    (state: RootState) => state.policeReports.reportRequests
  );
  const filteredReportRequest = reportRequestList.find(
    (reportRequest) => reportRequest.id === selectedReportRequestId.original.id
  );

  const title = selectedReportRequestId.original.title

  const initialState = {
    reportId: selectedReportRequestId.original.id || 0,
    status: filteredReportRequest?.status || "",
  };
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    console.log("formData", formData)
    e.preventDefault();
    const data = {
      id: Number(formData.reportId),
      status: Number(formData.status),
    };
    console.log(data);
    dispatch(changeReportStatus(data));
    setFormData(initialState);
    onCloseDrawer()
  };

  return (
    <BoxContainer>
      <Container>
        <div style={{ backgroundColor: "red", backgroundImage: "linear-gradient(to right, #34b7eb , #ffffff)", padding: "20px", marginBottom: "10px" }}>
          <Typography variant="h5">
            {` Change Report Request Status `}
          </Typography>
        </div>

        <form onSubmit={handleSubmit}>
          <Grid sx={{ mt: 1 }} container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <TextField
                  required
                  id="reportId"
                  name="reportId"
                  label="Report Id"
                  fullWidth
                  disabled
                  value={title}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid sx={{ mt: 1 }} container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="status">Status</InputLabel>
                <Select
                  labelId="status"
                  id="status"
                  name="status"
                  label="Status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <MenuItem value={1}>Pending</MenuItem>
                  <MenuItem value={2}>In Progress</MenuItem>
                  <MenuItem value={3}>Done</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Button sx={{ mt: 3, mb: 2 }} variant="contained" type="submit">
            Change Status
          </Button>
        </form>
      </Container>
    </BoxContainer>
  );
};
