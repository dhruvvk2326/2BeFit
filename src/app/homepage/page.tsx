"use client";
import React, { useState, useEffect } from "react";
import HomePageBanner1 from "@/components/HomePageBanner1/HomePageBanner1";
import { Box } from "@mui/material";
import SearchExercises from "@/components/SearchExercises/SearchExercises";
import Exercises from "@/components/Exercises/Exercises";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import axios from "axios";
import { useRouter } from "next/navigation";

const Homepage = () => {
  const [exercises, setExercises] = useState<any[]>([]);
  const [bodyPart, setBodyPart] = useState<string>("all");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Check login status when component mounts
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get("/api/auth/users/me");
      if (response.status === 200) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        router.push("/"); // Redirect to login page if not logged in
      }
    } catch (error) {
      console.error("Error checking login:", error);
      setIsLoggedIn(false);
      router.push("/"); // Redirect to login page on error
    }
  };

  return (
    <>
      {isLoggedIn && (
        <>
          <Navbar setIsloggedin={setIsLoggedIn} />
          <Box sx={{ width: { xl: "1488px" }, m: "auto" }}>
            <HomePageBanner1 />
            <SearchExercises
              setExercises={setExercises}
              bodyPart={bodyPart}
              setBodyPart={setBodyPart}
            />
            <Exercises
              setExercises={setExercises}
              bodyPart={bodyPart}
              exercises={exercises}
            />
          </Box>
          <Footer />
        </>
      )}
    </>
  );
};

export default Homepage;
