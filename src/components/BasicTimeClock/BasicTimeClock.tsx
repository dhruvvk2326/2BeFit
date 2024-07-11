import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimeClock } from "@mui/x-date-pickers/TimeClock";

const BasicTimeClock = ({ value, onChange }: { value: any; onChange: any }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimeClock
        value={value}
        onChange={onChange}
      />
    </LocalizationProvider>
  );
};

export default BasicTimeClock;
