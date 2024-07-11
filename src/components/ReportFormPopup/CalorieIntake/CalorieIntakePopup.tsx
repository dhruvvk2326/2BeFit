import React, { useState } from "react";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import BasicTimeClock from "@/components/BasicTimeClock/BasicTimeClock";
import dayjs from "dayjs";
import axios from "axios";

interface CalorieIntakePopupProps {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const CalorieIntakePopup: React.FC<CalorieIntakePopupProps> = ({ setShowPopup }) => {
  const [foodName, setFoodName] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedDate, setSelectedDate] = React.useState<dayjs.Dayjs | null>(null);
  const [value, setValue] = React.useState(null);

  const handleSave = async () => {
    try {
      const response = await axios.post("/api/CalorieIntake", {
        foodName,
        amount,
        selectedDate,
        time: value,
      });

      if (response.status === 200) {
        console.log("Data saved successfully!");
        setShowPopup(false); // Close the popup after saving
      } else {
        console.error("Failed to save data:", response.statusText);
      }
    } catch (error: any) {
      console.error("Failed to save data:", error.response?.data || error.message);
    }
  };

  return (
    <div className='fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-black bg-opacity-50 z-50'>
      <div className='relative flex flex-col gap-4 bg-white w-96 max-h-4/5 p-6 rounded-lg overflow-auto'>
        <button
          className='absolute top-2 right-2 bg-black text-yellow-500 w-8 h-8 rounded-full flex items-center justify-center text-xl cursor-pointer transition duration-300 z-10'
          onClick={() => setShowPopup(false)}>
          <AiOutlineClose />
        </button>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
          />
        </LocalizationProvider>

        <TextField
          id='outlined-basic'
          label='Food item name'
          variant='outlined'
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />
        <TextField
          id='outlined-basic'
          label='Food item amount (in gms)'
          variant='outlined'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className='flex justify-center'>
          <BasicTimeClock
            value={value}
            onChange={(newValue: React.SetStateAction<null>) => setValue(newValue)}
          />
        </div>
        <Button
          variant='contained'
          color='primary'
          onClick={handleSave}>
          Save
        </Button>
        {/* Existing saved items */}
        <div className='w-full h-px bg-yellow-500 my-4'></div>
        <div className='flex flex-col gap-2'>
          {/* Example saved items */}
          <div className='flex justify-between items-center'>
            <h3 className='text-base font-medium'>Apple</h3>
            <h3 className='text-base font-medium'>100 gms</h3>
            <button className='bg-yellow-500 text-white rounded-md px-2 py-1 text-sm cursor-pointer transition duration-300'>
              <AiFillDelete />
            </button>
          </div>
          <div className='flex justify-between items-center'>
            <h3 className='text-base font-medium'>Banana</h3>
            <h3 className='text-base font-medium'>200 gms</h3>
            <button className='bg-yellow-500 text-white rounded-md px-2 py-1 text-sm cursor-pointer transition duration-300'>
              <AiFillDelete />
            </button>
          </div>
          <div className='flex justify-between items-center'>
            <h3 className='text-base font-medium'>Rice</h3>
            <h3 className='text-base font-medium'>300 gms</h3>
            <button className='bg-yellow-500 text-white rounded-md px-2 py-1 text-sm cursor-pointer transition duration-300'>
              <AiFillDelete />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalorieIntakePopup;
