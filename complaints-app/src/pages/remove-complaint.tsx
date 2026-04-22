import React, { useState } from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { BoxContainer } from "../components";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { removeComplaint } from "../store/complaints/complaintsSlice";

interface IProps {
  onCloseDrawer: () => void;
}

export const RemoveComplaint = ({ onCloseDrawer }: IProps) => {
  const dispatch = useAppDispatch();
  const selectedComplaintId = useAppSelector(
    (state: RootState) => state.complaints.selectedComplaintId
  );

  console.log("123", selectedComplaintId.original)

  const initialState = {
    complaintId: selectedComplaintId.original.id || 0,
    reason: "",
  };
  const complaintTitle = selectedComplaintId.original.title;
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);
    const data = {
      complaintId: formData.complaintId,
      reason: formData.reason,
    };
    dispatch(removeComplaint(data));
    setFormData(initialState);
    onCloseDrawer();
  };

  console.log("form data", formData)

  return (
    <BoxContainer>
      <Container>
        <Typography sx={{ mt: 12, mb: 5 }} variant="h5" gutterBottom>
          Remove Complaint
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid sx={{ mt: 1 }} container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                required
                id="complaintId"
                name="complaintId"
                label="Complaint Title"
                fullWidth
                value={complaintTitle}
                disabled
              />
            </Grid>
          </Grid>

          <Grid sx={{ mt: 1 }} container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                id="reason"
                name="reason"
                label="Reason"
                multiline
                rows={12}
                fullWidth
                value={formData.reason}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>

          <Button sx={{ mt: 3, mb: 2 }} variant="contained" type="submit">
            Remove Complaint
          </Button>
        </form>
      </Container>
    </BoxContainer>
  );
};
