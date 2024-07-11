import React, { useState } from "react";
import axios from "axios";

interface WaterPopupProps {
  setShowPopup: (show: boolean) => void;
}

const WaterPopup: React.FC<WaterPopupProps> = ({ setShowPopup }) => {
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/Water", { amount });
      console.log("Water intake logged successfully!");
      setShowPopup(false); // Close the popup after saving
    } catch (error) {
      console.error("Failed to log water intake:", error);
    }
  };

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center'>
      <div className='bg-white p-5 rounded-lg shadow-xl'>
        <h2 className='text-xl font-bold mb-4'>Log Water Intake</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='amount'>
              Amount (ml)
            </label>
            <input
              type='number'
              id='amount'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              min='0'
            />
          </div>
          <div className='flex items-center justify-between'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='submit'>
              Log Water
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

export default WaterPopup;
