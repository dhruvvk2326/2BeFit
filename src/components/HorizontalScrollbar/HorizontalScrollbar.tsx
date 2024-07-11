import React from "react";
import Box from "@mui/material/Box";
import BodyPart from "../BodyPart/BodyPart";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import "./horizontal-scrollbar.css";

interface HorizontalScrollbarProps {
    data: string[]; // Ensure `data` is an array of strings
    bodyPart: string;
    setBodyPart: (bodyPart: string) => void;
}

const HorizontalScrollbar: React.FC<HorizontalScrollbarProps> = ({
    data,
    bodyPart,
    setBodyPart,
}) => {
    const LeftArrow = () => {
        const { scrollPrev } = React.useContext(VisibilityContext);
        return (
            <div
                onClick={() => scrollPrev()}
                className='arrow left-arrow'>
                &lt;
            </div>
        );
    };

    const RightArrow = () => {
        const { scrollNext } = React.useContext(VisibilityContext);
        return (
            <div
                onClick={() => scrollNext()}
                className='arrow right-arrow'>
                &gt;
            </div>
        );
    };

    return (
        <div className='horizontal-scrollbar'>
            <ScrollMenu
                LeftArrow={LeftArrow}
                RightArrow={RightArrow}>
                {data.map((item) => (
                    <Box
                        key={item} // Ensure each item has a unique key
                        itemID={item}
                        title={item}
                        m='0 40px'
                        sx={{
                            width: "270px",
                            height: "282px",
                            background: "#fff",
                            borderBottomLeftRadius: "20px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "transform 0.3s ease-in-out",
                            "&:hover": {
                                transform: "scale(1.05)",
                            },
                        }}
                        onClick={() => {
                            setBodyPart(item);
                            window.scrollTo({
                                top: 1800,
                                left: 100,
                                behavior: "smooth",
                            });
                        }}>
                        <BodyPart
                            item={item} // Pass the entire item object or specific properties
                            bodyPart={bodyPart} // Ensure this is correctly handled in `BodyPart` component
                            setBodyPart={setBodyPart}
                        />
                    </Box>
                ))}
            </ScrollMenu>
        </div>
    );
};

export default HorizontalScrollbar;
