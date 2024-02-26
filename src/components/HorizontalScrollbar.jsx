import React, { useContext } from "react";
import { ExerciseContext } from "../store/ExerciseContext";
import BodyPart from "./BodyPart";
import { Box, Typography } from "@mui/material";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import RightArrowIcon from "../assets/icons/right-arrow.png";
import LeftArrowIcon from "../assets/icons/left-arrow.png";

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollPrev()} className="right-arrow">
      <img src={LeftArrowIcon} alt="right-arrow" />
    </Typography>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollNext()} className="left-arrow">
      <img src={RightArrowIcon} alt="right-arrow" />
    </Typography>
  );
};

const HorizontalScrollbar = () => {
  const { bodyParts } = useContext(ExerciseContext);
  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {bodyParts.map((item) => (
        <Box
          key={item.id || item.name}
          itemId={item.id || item.name}
          title={item.id || item.name}
          m="0 40px"
        >
          <BodyPart item={item} />
        </Box>
      ))}
    </ScrollMenu>
  );
};

export default HorizontalScrollbar;
