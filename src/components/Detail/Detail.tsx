import React from "react";
import { Typography, Stack, Button } from "@mui/material";
import Image from "next/image";
import BodyPartImage from "@/assets/body-part.png";
import TargetImage from "@/assets/target.png";
import EquipmentImage from "@/assets/equipment.png";

const Detail = ({ exerciseDetail }: { exerciseDetail: any }) => {
    const { bodyPart, gifUrl, name, target, equipment } = exerciseDetail;

    const extraDetail = [
        {
            icon: BodyPartImage,
            name: bodyPart,
        },
        {
            icon: TargetImage,
            name: target,
        },
        {
            icon: EquipmentImage,
            name: equipment,
        },
    ];

    return (
        <Stack
            direction={{ xs: "column", lg: "row" }}
            sx={{
                p: "10px",
                alignItems: "center",
                gap: { lg: "50px", xs: "20px" },
            }}>
            <Image
                unoptimized
                height={150}
                width={500}
                src={gifUrl}
                alt={name}
                loading='lazy'
                className='detail-image'
            />
            <div className='m-10 p-20'></div>
            <Stack sx={{ gap: { lg: "30px", xs: "15px" } }}>
                <Typography
                    sx={{ fontSize: { lg: "48px", xs: "24px" } }}
                    fontWeight={700}
                    textTransform='capitalize'>
                    {name}
                </Typography>
                <Typography
                    sx={{ fontSize: { lg: "18px", xs: "14px" } }}
                    color='#4F4C4C'></Typography>
                {extraDetail?.map((item) => (
                    <Stack
                        key={item.name}
                        direction='row'
                        gap='16px'
                        alignItems='center'>
                        <Button
                            sx={{
                                background: "#FFF2DB",
                                borderRadius: "50%",
                                width: "70px",
                                height: "70px",
                            }}>
                            <Image
                                height={35}
                                width={35}
                                src={item.icon}
                                alt={bodyPart}
                                style={{ width: "35px", height: "35px" }}
                            />
                        </Button>
                        <Typography
                            textTransform='capitalize'
                            sx={{ fontSize: { lg: "24px", xs: "16px" } }}>
                            {item.name}
                        </Typography>
                    </Stack>
                ))}
            </Stack>
        </Stack>
    );
};

export default Detail;
