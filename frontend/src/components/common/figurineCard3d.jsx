import React from "react";
import { CardContainer, CardBody, CardItem } from "../ui/3d-card";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";  // Missing import for ShareIcon

const FigurineCard3d = ({ figurine }) => {
  return (  // Added the return statement here
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:bg-black border w-auto sm:w-[30rem] h-auto rounded-xl p-6">
        {/* Image */}
        <CardItem translateZ="100" className="w-full">
          <img
            src={figurine.image}
            alt={figurine.name}
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
          />
        </CardItem>

        {/* Figurine Name */}
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white font-delius mt-4"
        >
          {figurine.name}
        </CardItem>

        {/* Figurine Details */}
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 font-delius"
        >
          Origin: {figurine.origin} <br />
          Classification: {figurine.classification} <br />
          Price: ${figurine.price}
        </CardItem>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-4">
          <CardItem translateZ={20} as="div" className="flex">
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}

export default FigurineCard3d; 
