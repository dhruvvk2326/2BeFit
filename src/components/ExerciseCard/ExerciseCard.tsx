import React from "react";
import { Stack, Button, Typography, Box } from "@mui/material";
import Link from "next/link";
import Image from "next/legacy/image";

interface ExerciseCardProps {
    exercise: {
        id: string;
        name: string;
        gifUrl: string;
        bodyPart: string;
        target: string;
    };
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
    return (
        <Link
            href={`/exercise/${exercise.id}`}
            passHref>
            <Box
                className='exercise-card'
                sx={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "16px",
                    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.2)",
                    },
                }}>
                <Image
                    src={exercise.gifUrl}
                    alt={exercise.name}
                    width={300}
                    height={300}
                    loading='lazy'
                    unoptimized
                    // Ensure smooth animation and fit within the container
                    style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                    }}
                />
                <Stack direction='row'>
                    <Button
                        sx={{
                            ml: "21px",
                            color: "#fff",
                            background: "#FFA9A9",
                            fontSize: "14px",
                            borderRadius: "20px",
                            textTransform: "capitalize",
                        }}>
                        {exercise.bodyPart}
                    </Button>
                    <Button
                        sx={{
                            ml: "21px",
                            color: "#fff",
                            background: "#FCC757",
                            fontSize: "14px",
                            borderRadius: "20px",
                            textTransform: "capitalize",
                        }}>
                        {exercise.target}
                    </Button>
                </Stack>
                <Typography
                    ml='21px'
                    color='#000'
                    fontWeight='bold'
                    sx={{ fontSize: { lg: "24px", xs: "20px" } }}
                    mt='11px'
                    pb='10px'
                    textTransform='capitalize'>
                    {exercise.name}
                </Typography>
            </Box>
        </Link>
    );
};

export default ExerciseCard;
