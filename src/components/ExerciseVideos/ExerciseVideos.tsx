import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Loader from "../Loader/Loader";

const ExerciseVideos = ({ exerciseVideos, name }: any) => {
    if (!exerciseVideos.length) return <Loader />;

    return (
        <Box
            sx={{ marginTop: { lg: "100px", xs: "20px" } }}
            p='20px'>
            <Typography
                sx={{ fontSize: { lg: "44px", xs: "25px" } }}
                fontWeight={700}
                color='#000'
                mb='33px'>
                Watch{" "}
                <span style={{ color: "#FF2625", textTransform: "capitalize" }}>
                    {name}
                </span>{" "}
                exercise videos
            </Typography>
            <Stack
                direction='row'
                sx={{
                    gap: { lg: "50px", xs: "10px" },
                    justifyContent: "center",
                    flexWrap: "nowrap",
                }}
                alignItems='center'>
                {exerciseVideos?.slice(0, 3)?.map((item: any, index: any) => (
                    <a
                        key={index}
                        className='exercise-video'
                        href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
                        target='_blank'
                        rel='noreferrer'
                        style={{ textDecoration: "none" }}>
                        <img
                            style={{
                                borderTopLeftRadius: "20px",
                                maxWidth: "300px",
                            }}
                            src={item.video.thumbnails[0].url}
                            alt={item.video.title}
                        />
                        <Box mt='8px'>
                            <Typography
                                sx={{ fontSize: { lg: "20px", xs: "16px" } }}
                                fontWeight={600}
                                color='#000'>
                                {item.video.title.length > 40
                                    ? `${item.video.title.substring(0, 40)}...`
                                    : item.video.title}
                            </Typography>
                            <Typography
                                fontSize='14px'
                                color='#000'>
                                {item.video.channelName}
                            </Typography>
                        </Box>
                    </a>
                ))}
            </Stack>
        </Box>
    );
};

export default ExerciseVideos;
