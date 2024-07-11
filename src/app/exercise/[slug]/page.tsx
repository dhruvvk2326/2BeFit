"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useParams } from "next/navigation";
import SimilarExercises from "@/components/SimilarExercises/SimilarExercises";
import Loader from "@/components/Loader/Loader";
import Detail from "@/components/Detail/Detail";
import ExerciseVideos from "@/components/ExerciseVideos/ExerciseVideos";
import { fetchData, exerciseOptions, youtubeOptions } from "@/utils/fetchData";
import { Box } from "@mui/material";

const ExerciseDetail = () => {
    const [exerciseDetail, setExerciseDetail] = useState<{
        equipment: any;
        target: any;
        name: string;
    } | null>(null);
    const [exerciseVideos, setExerciseVideos] = useState([]);
    const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
    const [equipmentExercises, setEquipmentExercises] = useState([]);
    const [error, setError] = useState<any>(null); // State to handle errors

    const searchParams = useSearchParams();
    const { slug } = useParams(); // Get the slug parameter from useParams

    console.log("slug:", slug); // Debug line

    useEffect(() => {
        // Fetch data when slug is available
        if (slug) {
            const fetchExerciseDetail = async () => {
                try {
                    const exerciseDbUrl = "https://exercisedb.p.rapidapi.com";
                    const youtubeSearchUrl =
                        "https://youtube-search-and-download.p.rapidapi.com";

                    const exerciseDetailData = (await fetchData(
                        `${exerciseDbUrl}/exercises/exercise/${slug}`,
                        exerciseOptions
                    )) as {
                        equipment: any;
                        target: any;
                        name: string;
                    }; // Add type assertion to specify the type of exerciseDetailData
                    setExerciseDetail(exerciseDetailData);

                    const exerciseVideosData = await fetchData(
                        `${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`,
                        youtubeOptions
                    );
                    setExerciseVideos(exerciseVideosData.contents);

                    const targetMuscleExercisesData = await fetchData(
                        `${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,
                        exerciseOptions
                    );
                    setTargetMuscleExercises(targetMuscleExercisesData);

                    const equipmentExercisesData = await fetchData(
                        `${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,
                        exerciseOptions
                    );
                    setEquipmentExercises(equipmentExercisesData);
                } catch (error) {
                    console.error("Error fetching exercise data:", error);
                    setError(
                        "Failed to fetch exercise data. Please try again later."
                    );
                }
            };

            fetchExerciseDetail();
        }
    }, [slug]); // Add slug as a dependency to the useEffect hook

    if (!exerciseDetail) {
        return <Loader />;
    }

    return (
        <Box>
            <Detail exerciseDetail={exerciseDetail} />
            <ExerciseVideos
                exerciseVideos={exerciseVideos}
                name={exerciseDetail.name}
            />
            <SimilarExercises targetMuscleExercises={targetMuscleExercises} />
        </Box>
    );
};

export default ExerciseDetail;
