import React, { useEffect } from "react";
import CircularProgress from "@mui/joy/CircularProgress";
import { AiOutlineEye } from "react-icons/ai";
import axios from "axios";

const HomePageBanner1 = () => {
  const [data, setData] = React.useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("/api/report", {
          withCredentials: true,
        });
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      }
    };

    getData();
  }, []);

  const gradientClasses = [
    "bg-gradient-to-r from-yellow-200 to-orange-200",
    "bg-gradient-to-r from-green-200 to-teal-200",
    "bg-gradient-to-r from-cyan-200 to-blue-200",
    "bg-gradient-to-r from-pink-200 to-pink-400",
    "bg-gradient-to-r from-red-200 to-orange-200",
  ];

  return (
    <div className='flex flex-wrap justify-center gap-8 p-4'>
      {data?.length > 0 &&
        data.map((item: any, index: number) => (
          <div
            className={`w-60 sm:w-45 h-auto rounded-lg shadow-md transition-all flex flex-col justify-between items-center p-4 cursor-pointer ${
              gradientClasses[index % gradientClasses.length]
            }`}
            key={index}
            style={{ minWidth: "200px", maxWidth: "300px" }}>
            <div className='flex justify-between items-center w-full mb-4'>
              <div className='flex flex-col w-1/2 bg-white aspect-square items-center justify-center shadow-md rounded-lg text-center p-2'>
                <div className='text-sm font-bold'>{item.name}</div>
                <div className='text-sm text-gray-800'>
                  {item.value} {item.unit}
                </div>
              </div>
              <div className='flex flex-col w-1/2 bg-white aspect-square items-center justify-center shadow-md rounded-lg text-center p-2'>
                <div className='text-sm font-bold'>Target</div>
                <div className='text-sm text-gray-800'>
                  {item.goal} {item.unit}
                </div>
              </div>
            </div>

            <div className='flex justify-center items-center mb-4'>
              <CircularProgress
                color='neutral'
                determinate
                variant='solid'
                size='lg'
                value={Math.min((item.value / item.goal) * 100, 100)}>
                <span className='text-gray-800 font-bold flex justify-center items-center'>{Math.round((item.value / item.goal) * 100)}%</span>
              </CircularProgress>
            </div>

            <button
              className='bg-white text-gray-800 border-none rounded-xl py-2 px-4 text-sm cursor-pointer transition-all flex items-center gap-1.25 hover:bg-gray-800 hover:text-white'
              onClick={() => {
                window.location.href = `/report/${item.name}`;
              }}>
              Show Report <AiOutlineEye />
            </button>
          </div>
        ))}
    </div>
  );
};

export default HomePageBanner1;
