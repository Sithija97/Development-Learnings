import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
} from "@mui/material";
import { BoxContainer } from "../components";
import { Dashboard } from "../layouts";
import { IPaymentData } from "../models";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { createPayment } from "../store/payments/paymentSlice";

const months = [
  { name: "January", number: 1 },
  { name: "February", number: 2 },
  { name: "March", number: 3 },
  { name: "April", number: 4 },
  { name: "May", number: 5 },
  { name: "June", number: 6 },
  { name: "July", number: 7 },
  { name: "August", number: 8 },
  { name: "September", number: 9 },
  { name: "October", number: 10 },
  { name: "November", number: 11 },
  { name: "December", number: 12 },
];

export const Payment = () => {
  const dispatch = useAppDispatch();
  const selectedFineId = useAppSelector(
    (state: RootState) => state.fines.selectedFineId.original.id
  );
  const { userFines } = useAppSelector((state: RootState) => state.fines);
  const filteredFine = userFines.find((fine) => fine.id === selectedFineId);

  console.log(filteredFine);
  console.log(selectedFineId);

  const initialPaymentInfo = {
    title: "",
    description: "",
    cardNumber: "",
    amount: 0,
    expiryMonth: "",
    expiryYear: "",
  };

  const [paymentInfo, setPaymentInfo] = useState(initialPaymentInfo);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setPaymentInfo({
      ...paymentInfo,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const paymentData: IPaymentData = {
      title: paymentInfo.title,
      description: paymentInfo.description,
      fineId: selectedFineId || 0,
      amount: Number(paymentInfo.amount),
    };

    if (filteredFine?.amount !== paymentData.amount) {
      alert(
        `Your Fine amount is ${filteredFine?.amount}. Please make the full payment.`
      );
    } else if (filteredFine?.amount < paymentData.amount) {
      alert(
        `Your Fine amount is ${filteredFine?.amount}. Please pay the coorect amount.`
      );
    } else {
      dispatch(createPayment(paymentData));
      setPaymentInfo(initialPaymentInfo);
    }
  };

  return (
    <Dashboard>
      <BoxContainer>
        <Container maxWidth={"md"} sx={{ mt: 12, mb: 4 }}>
          <Card variant="outlined" sx={{ p: 8 }}>
            <Typography variant="h6" gutterBottom>
              Payment Information
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    variant="outlined"
                    value={paymentInfo.title}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    variant="outlined"
                    value={paymentInfo.description}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Card Number"
                    name="cardNumber"
                    variant="outlined"
                    value={paymentInfo.cardNumber}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Amount"
                    name="amount"
                    variant="outlined"
                    value={paymentInfo.amount}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Expiry Month</InputLabel>
                    <Select
                      label="Expiry Month"
                      name="expiryMonth"
                      value={paymentInfo.expiryMonth}
                      onChange={handleChange}
                      required
                    >
                      {months.map((month) => (
                        <MenuItem value={month.number}>{month.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Expiry Year</InputLabel>
                    <Select
                      label="Expiry Year"
                      name="expiryYear"
                      value={paymentInfo.expiryYear}
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="2023">2023</MenuItem>
                      <MenuItem value="2024">2024</MenuItem>
                      <MenuItem value="2025">2025</MenuItem>
                      <MenuItem value="2026">2026</MenuItem>
                      <MenuItem value="2027">2027</MenuItem>
                      <MenuItem value="2028">2028</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={filteredFine?.status === 2}
                sx={{ mt: 2 }}
              >
                Submit Payment
              </Button>
            </form>
          </Card>
        </Container>
      </BoxContainer>
    </Dashboard>
  );
};
