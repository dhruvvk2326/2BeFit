import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { Box, Stack, Typography } from "@mui/material";

import { exerciseOptions, fetchData } from "@/utils/fetchData";
import ExerciseCard from "@/components/ExerciseCard/ExerciseCard";
import Loader from "@/components/Loader/Loader";

interface Exercise {
  id: string;
  name: string;
  gifUrl: string;
  bodyPart: string;
  target: string;
  equipment: string;
}

interface ExercisesProps {
  exercises: Exercise[];
  setExercises: (exercises: Exercise[]) => void;
  bodyPart: string;
}

const Exercises: React.FC<ExercisesProps> = ({
  exercises,
  setExercises,
  bodyPart,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [exercisesPerPage] = useState<number>(9);

  useEffect(() => {
    const fetchExercisesData = async () => {
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
    };

    fetchExercisesData();
  }, [bodyPart, setExercises]);

  // Pagination
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = Array.isArray(exercises)
    ? exercises.slice(indexOfFirstExercise, indexOfLastExercise)
    : [];

  const paginate = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);

    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  if (!currentExercises.length) return <Loader />;

  return (
    <Box
      id='exercises'
      sx={{ mt: { lg: "109px" } }}
      mt='50px'
      p='20px'>
      <Typography
        variant='h4'
        fontWeight='bold'
        sx={{ fontSize: { lg: "44px", xs: "30px" } }}
        mb='46px'>
        Showing Results
      </Typography>
      <Stack
        direction='row'
        sx={{ gap: { lg: "107px", xs: "50px" } }}
        flexWrap='wrap'
        justifyContent='center'>
        {currentExercises.map((exercise, idx) => (
          <ExerciseCard
            key={idx}
            exercise={exercise}
          />
        ))}
      </Stack>
      <Stack
        sx={{ mt: { lg: "114px", xs: "70px" } }}
        alignItems='center'>
        {exercises.length > exercisesPerPage && (
          <Pagination
            color='standard'
            shape='rounded'
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size='large'
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
