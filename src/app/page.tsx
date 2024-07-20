"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/assets/—Pngtree—fitness logo_4148172.png";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import dayjs from "dayjs";
import axios from "axios";
import wallpaper from "@/assets/wallpaper.jpg";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  weightInKg: number;
  heightInCm: number;
  goal: string;
  gender: string;
  dob: Date;
  activityLevel: string;
}

const Page: React.FC = () => {
  const [showSignup, setShowSignup] = useState<boolean>(false);
  const [signupFormData, setSignupFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    weightInKg: 0.0,
    heightInCm: 0.0,
    goal: "",
    gender: "",
    dob: new Date(),
    activityLevel: "",
  });
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleLogin = () => {
    axios
      .post("/api/auth/users/login", loginFormData, { withCredentials: true })
      .then((res) => {
        if (res.data.ok) {
          console.log("Login successful");
          toast.success(res.data.message);
          router.push("/homepage");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignup = () => {
    axios
      .post("/api/auth/users/register", signupFormData)
      .then((res) => {
        if (res.data.ok) {
          toast.success(res.data.message);
          router.push("/");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='fixed top-0 left-0 w-full h-full flex'>
      <div className='w-1/2 h-full flex justify-center items-center bg-gradient-to-r from-gray-800 via-gray-900 to-black'>
        {showSignup ? (
          <div className='bg-black bg-opacity-75 w-3/4 lg:w-2/3 rounded-lg overflow-auto shadow-lg p-5 h-3/4'>
            <h1 className='text-yellow-400 text-2xl font-light text-center mb-4'>Signup to become a freak</h1>
            <form className='space-y-4'>
              <Input
                color='warning'
                placeholder='Name'
                size='lg'
                variant='solid'
                onChange={(e) => setSignupFormData({ ...signupFormData, name: e.target.value })}
              />
              <Input
                color='warning'
                placeholder='Email'
                size='lg'
                variant='solid'
                onChange={(e) =>
                  setSignupFormData({
                    ...signupFormData,
                    email: e.target.value,
                  })
                }
              />
              <Input
                color='warning'
                placeholder='Password'
                size='lg'
                variant='solid'
                type='password'
                onChange={(e) =>
                  setSignupFormData({
                    ...signupFormData,
                    password: e.target.value,
                  })
                }
              />
              <Input
                color='warning'
                size='lg'
                variant='solid'
                type='number'
                placeholder='Weight in kg'
                onChange={(e) =>
                  setSignupFormData({
                    ...signupFormData,
                    weightInKg: parseFloat(e.target.value),
                  })
                }
              />
              <Select
                color='warning'
                placeholder='Activity Level'
                size='lg'
                variant='solid'
                onChange={(event: React.SyntheticEvent | null, newValue: string | null) =>
                  setSignupFormData({
                    ...signupFormData,
                    activityLevel: newValue?.toString() || "",
                  })
                }>
                <Option value='sedentary'>Sedentary</Option>
                <Option value='light'>Light</Option>
                <Option value='moderate'>Moderate</Option>
                <Option value='active'>Active</Option>
                <Option value='veryActive'>Very Active</Option>
              </Select>
              <Select
                color='warning'
                placeholder='Goal'
                size='lg'
                variant='solid'
                onChange={(event: React.SyntheticEvent | null, newValue: string | null) =>
                  setSignupFormData({
                    ...signupFormData,
                    goal: newValue?.toString() || "",
                  })
                }>
                <Option value='weightLoss'>Lose</Option>
                <Option value='weightMaintain'>Maintain</Option>
                <Option value='weightGain'>Gain</Option>
              </Select>
              <Select
                color='warning'
                placeholder='Gender'
                size='lg'
                variant='solid'
                onChange={(event: React.SyntheticEvent | null, newValue: string | null) =>
                  setSignupFormData({
                    ...signupFormData,
                    gender: newValue?.toString() || "",
                  })
                }>
                <Option value='male'>Male</Option>
                <Option value='female'>Female</Option>
                <Option value='other'>Other</Option>
              </Select>
              <label className='text-white'>Height</label>
              <Input
                color='warning'
                size='lg'
                variant='solid'
                type='number'
                placeholder='cm'
                onChange={(e) =>
                  setSignupFormData({
                    ...signupFormData,
                    heightInCm: parseFloat(e.target.value),
                  })
                }
              />
              <label className='text-white'>Date of Birth</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  sx={{
                    backgroundColor: "#1a1a1a", // Background color
                    color: "#ffffff", // Text color
                    zIndex: 10,
                    "& .MuiInputBase-root": {
                      color: "white", // Ensure the input text is white
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "yellow", // Border color
                    },
                    "& .MuiSvgIcon-root": {
                      color: "white", // Icon color
                    },
                  }}
                  defaultValue={dayjs(new Date())}
                  onChange={(newValue) =>
                    setSignupFormData({
                      ...signupFormData,
                      dob: new Date(newValue as any),
                    })
                  }
                />
              </LocalizationProvider>
              <button
                className='bg-yellow-500 text-white px-4 py-2 rounded w-full mt-4'
                onClick={(e) => {
                  e.preventDefault();
                  handleSignup();
                }}>
                Signup
              </button>
            </form>
            <p className='text-white mt-4'>
              Already have an account?{" "}
              <button
                className='text-yellow-400 hover:underline'
                onClick={() => setShowSignup(false)}>
                Login
              </button>
            </p>
          </div>
        ) : (
          <div className='bg-black bg-opacity-75 w-3/4 lg:w-2/3 rounded-lg overflow-auto shadow-lg p-5 h-auto'>
            <h1 className='text-yellow-400 text-2xl font-light text-center mb-4'>Login to become a freak</h1>
            <form className='space-y-4'>
              <Input
                color='warning'
                placeholder='Email'
                size='lg'
                variant='solid'
                onChange={(e) => setLoginFormData({ ...loginFormData, email: e.target.value })}
              />
              <Input
                color='warning'
                placeholder='Password'
                size='lg'
                variant='solid'
                type='password'
                onChange={(e) =>
                  setLoginFormData({
                    ...loginFormData,
                    password: e.target.value,
                  })
                }
              />
              <button
                className='bg-yellow-500 text-black px-4 py-2 rounded w-full mt-4'
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}>
                Login
              </button>
            </form>
            <p className='text-white mt-4'>
              Don't have an account?{" "}
              <button
                className='text-yellow-400 hover:underline'
                onClick={() => setShowSignup(true)}>
                Signup
              </button>
            </p>
          </div>
        )}
      </div>
      <div className='w-1/2 h-full relative'>
        <Image
          src={wallpaper}
          alt='Fitness Wallpaper'
          layout='fill'
          objectFit='cover'
          quality={100}
          className='rounded-lg'
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Page;
