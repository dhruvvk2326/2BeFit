import React from "react";
import { Stack, Typography } from "@mui/material";
import Image from "next/legacy/image";
import Icon from "../../assets/gym.png";

interface BodyPartProps {
    item: string;
    setBodyPart: (bodyPart: string) => void;
    bodyPart: string;
}

const BodyPart: React.FC<BodyPartProps> = ({ item, setBodyPart, bodyPart }) => (
    <Stack
        component='button'
        alignItems='center'
        justifyContent='center'
        className='bodyPart-card'
        sx={
            bodyPart === item
                ? {
                      borderTop: "4px solid #FF2625",
                      background: "#fff",
                      borderBottomLeftRadius: "20px",
                      width: "270px",
                      height: "282px",
                      cursor: "pointer",
                      gap: "47px",
                  }
                : {
                      background: "#fff",
                      borderBottomLeftRadius: "20px",
                      width: "270px",
                      height: "282px",
                      cursor: "pointer",
                      gap: "47px",
                  }
        }
        onClick={() => {
            setBodyPart(item);
            window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });
        }}>
        <Image
            src={Icon}
            alt='dumbbell'
            width={40}
            height={40}
        />
        <Typography
            fontSize='24px'
            fontWeight='bold'
            fontFamily='Alegreya'
            color='#3A1212'
            textTransform='capitalize'>
            {item}
        </Typography>
    </Stack>
);

export default BodyPart;
