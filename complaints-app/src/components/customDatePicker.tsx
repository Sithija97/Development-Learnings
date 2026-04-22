import React from "react";
import { DatePicker } from "@mui/x-date-pickers";

interface IProps {
  label: string;
  name: string;
  value: any;
  onChange: (event: any) => void;
}

export const CustomDatePicker = ({ label, name, value, onChange }: IProps) => {
  const handleChange = (date: any) => {
    const event = {
      target: {
        name,
        value: date,
      },
    };
    onChange(event);
  };
  return (
    <DatePicker
      slotProps={{ textField: { error: false } }}
      label={label}
      value={value}
      onChange={handleChange}
    />
  );
};
