import React, { useEffect, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import HorizontalScrollbar from "@/components/HorizontalScrollbar/HorizontalScrollbar";
import { fetchData, exerciseOptions } from "@/utils/fetchData";

interface Exercise {
  name: string;
  target: string;
  equipment: string;
  bodyPart: string;
}

interface SearchExercisesProps {
  setExercises: (exercises: Exercise[]) => void;
  bodyPart: string;
  setBodyPart: (bodyPart: string) => void;
}

const SearchExercises: React.FC<SearchExercisesProps> = ({
  setExercises,
  bodyPart,
  setBodyPart,
}) => {
  const [search, setSearch] = useState<string>("");
  const [bodyParts, setBodyParts] = useState<string[]>([]);

  useEffect(() => {
    const fetchBodyParts = async () => {
      try {
        const bodyPartsData = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises/bodyPartList?limit=1234",
          exerciseOptions
        );
        if (Array.isArray(bodyPartsData)) {
          setBodyParts(["all", ...bodyPartsData]);
        } else {
          console.error("bodyPartsData is not an array:", bodyPartsData);
        }
      } catch (error) {
        console.error("Error fetching body parts:", error);
      }
    };

    fetchBodyParts();
  }, []);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        let exercisesData: Exercise[] = [];
        if (bodyPart === "all") {
          exercisesData = await fetchData(
            "https://exercisedb.p.rapidapi.com/exercises?limit=1234",
            exerciseOptions
          );
        } else {
          exercisesData = await fetchData(
            `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=1234`,
            exerciseOptions
          );
        }
        setExercises(exercisesData);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, [bodyPart, setExercises]);

  const handleSearch = async () => {
    if (search) {
      try {
        const exercisesData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises?limit=1234`,
          exerciseOptions
        );
        const searchedExercises = exercisesData.filter(
          (item: Exercise) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.target.toLowerCase().includes(search.toLowerCase()) ||
            item.equipment.toLowerCase().includes(search.toLowerCase()) ||
            item.bodyPart.toLowerCase().includes(search.toLowerCase())
        );

        window.scrollTo({
          top: 1800,
          left: 100,
          behavior: "smooth",
        });
        setSearch("");
        setExercises(searchedExercises);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    }
  };

  return (
    <Stack
      alignItems='center'
      mt='37px'
      justifyContent='center'
      p='20px'>
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: "44px", xs: "30px" } }}
        mb='49px'
        textAlign='center'>
        Search Exercises
      </Typography>
      <Box
        position='relative'
        mb='72px'>
        <TextField
          sx={{
            input: {
              fontWeight: "700",
              border: "none",
              borderRadius: "4px",
              height: "3rem",
              paddingY: "1rem",
              width: { lg: "1170px", xs: "350px" },
              backgroundColor: "#fff",
            },
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search Exercises'
          type='text'
        />
        <Button
          className='search-btn'
          sx={{
            bgcolor: "#FF2625",
            color: "#fff",
            textTransform: "none",
            width: { lg: "173px", xs: "80px" },
            height: "50px",
            fontSize: { lg: "20px", xs: "14px" },
            borderRadius: "40px",
            position: "absolute",
            right: "0px",
            top: 0,
            bottom: 0,
            margin: "auto",
          }}
          onClick={handleSearch}>
          Search
        </Button>
      </Box>
      <Box sx={{ position: "relative", width: "100%", p: "20px" }}>
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
        />
      </Box>
    </Stack>
  );
};

export default SearchExercises;
