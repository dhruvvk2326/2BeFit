import React, { useRef } from "react";
import { Typography, Stack, IconButton } from "@mui/material";
import Image from "next/legacy/image";
import Link from "next/link";
import Loader from "@/components/Loader/Loader";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const SimilarExercises = ({ targetMuscleExercises }: any) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft -= 350; // Scroll by the width of the exercise card
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += 350; // Scroll by the width of the exercise card
        }
    };

    return (
        <div style={{ marginTop: "100px", position: "relative" }}>
            <Typography
                sx={{
                    fontSize: { lg: "44px", xs: "25px" },
                    marginLeft: "20px",
                }}
                fontWeight={700}
                color='#000'
                mb='33px'>
                Similar{" "}
                <span style={{ color: "#FF2625", textTransform: "capitalize" }}>
                    Target Muscle
                </span>{" "}
                exercises
            </Typography>
            <div
                style={{
                    overflowX: "auto",
                    paddingLeft: "60px",
                    paddingRight: "60px",
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.1)",
                    WebkitOverflowScrolling: "touch",
                }}
                ref={scrollRef}>
                <Stack
                    direction='row'
                    sx={{
                        padding: 2,
                        flexWrap: "nowrap",
                        gap: "16px",
                    }}>
                    {targetMuscleExercises.length !== 0 ? (
                        targetMuscleExercises.map((exercise: any) => (
                            <Link
                                key={exercise.id}
                                href={`/exercise/${exercise.id}`}
                                passHref>
                                <Stack
                                    component='a'
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        textDecoration: "none",
                                        color: "inherit",
                                        minWidth: "350px",
                                    }}>
                                    <Image
                                        unoptimized
                                        src={exercise.gifUrl}
                                        alt={exercise.name}
                                        width={350}
                                        height={300}
                                        style={{ borderRadius: "10px" }}
                                    />
                                    <Typography
                                        variant='h6'
                                        sx={{ marginTop: 1 }}>
                                        {exercise.name}
                                    </Typography>
                                </Stack>
                            </Link>
                        ))
                    ) : (
                        <Loader />
                    )}
                </Stack>
            </div>
            {/* Scroll Buttons */}
            <IconButton
                onClick={scrollLeft}
                style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    zIndex: 1,
                    fontSize: "2rem", // Increase the icon size
                }}
                aria-label='Scroll Left'>
                <ChevronLeftIcon fontSize='inherit' />{" "}
                {/* Inherit the increased font size */}
            </IconButton>
            <IconButton
                onClick={scrollRight}
                style={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    zIndex: 1,
                    fontSize: "2rem", // Increase the icon size
                }}
                aria-label='Scroll Right'>
                <ChevronRightIcon fontSize='inherit' />{" "}
                {/* Inherit the increased font size */}
            </IconButton>
        </div>
    );
};

export default SimilarExercises;
