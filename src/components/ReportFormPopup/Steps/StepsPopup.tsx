import React, { useState } from "react";
import axios from "axios";

interface StepsPopupProps {
  setShowPopup: (show: boolean) => void;
}

const StepsPopup: React.FC<StepsPopupProps> = ({ setShowPopup }) => {
  const [steps, setSteps] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/Steps", { steps });
      console.log("Steps logged successfully!");
      setShowPopup(false); // Close the popup after saving
    } catch (error) {
      console.error("Failed to log steps:", error);
    }
  };

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center'>
      <div className='bg-white p-5 rounded-lg shadow-xl'>
        <h2 className='text-xl font-bold mb-4'>Log Steps</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='steps'>
              Steps Count
            </label>
            <input
              type='number'
              id='steps'
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              min='0'
            />
          </div>
          <div className='flex items-center justify-between'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='submit'>
              Log Steps
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

export default StepsPopup;
