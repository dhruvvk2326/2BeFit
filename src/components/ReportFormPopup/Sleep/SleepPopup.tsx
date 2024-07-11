import React, { useState } from "react";
import axios from "axios";

interface SleepPopupProps {
  setShowPopup: (show: boolean) => void;
}

const SleepPopup: React.FC<SleepPopupProps> = ({ setShowPopup }) => {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/Sleep", {
        hours,
        minutes,
      });
      console.log("Sleep duration logged successfully!");
      setShowPopup(false); // Close the popup after saving
    } catch (error) {
      console.error("Failed to log sleep duration:", error);
    }
  };

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center'>
      <div className='bg-white p-5 rounded-lg shadow-xl'>
        <h2 className='text-xl font-bold mb-4'>Log Sleep Duration</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='hours'>
              Hours
            </label>
            <input
              type='number'
              id='hours'
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              min='0'
              max='24'
            />
          </div>
          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='minutes'>
              Minutes
            </label>
            <input
              type='number'
              id='minutes'
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              min='0'
              max='59'
            />
          </div>
          <div className='flex items-center justify-between'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='submit'>
              Log Sleep
            </button>
            <button
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='button'
              onClick={() => setShowPopup(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SleepPopup;
