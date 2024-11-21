import React, { useState } from "react";
import { CardContainer, CardBody, CardItem } from "../ui/3d-card";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PreviewIcon from "@mui/icons-material/Preview";
import StorefrontIcon from "@mui/icons-material/Storefront";
import FigurineModal from "../ui/modal";
import { useDispatch, useSelector } from "react-redux";
import { add2Favorite } from "../store/cardSlices/add2FavoriteSlice";

const FigurineCard3d = ({ figurine }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.add2Favorite.favorites);

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user._id : null;
  const isFavorite = favorites.some(fav => fav._id === figurine._id);

  const handleAddToFavorite = (figurineId) => {
    console.log("Adding to favorites:", figurineId); // Debugging the dispatch
    dispatch(add2Favorite({ figurineId, userId }));
  };

  return (
    <>
      <CardContainer className="inter-var">
        <CardBody className="bg-gray-50 relative group/card dark:bg-black border w-auto sm:w-[30rem] h-auto rounded-xl p-4">
          <CardItem translateZ="100" className="w-full">
            <img
              src={figurine.image}
              alt={figurine.name}
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            />
          </CardItem>
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white font-delius mt-4"
          >
            {figurine.name}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 font-delius"
          >
            Origin: {figurine.origin} <br />
            Classification: {figurine.classification} <br />
            Price: ${figurine.price}
          </CardItem>

          <div className="flex justify-center items-center mt-4">
            <CardItem translateZ={20} as="div" className="flex space-x-10">
              <Tooltip title={`Add ${figurine.name} to Favorites <3`} placement="top">
                <IconButton 
                  aria-label="add to favorites"
                  onClick={() => handleAddToFavorite(figurine._id)}
                >
                  {isFavorite ?<FavoriteBorderIcon />  : <FavoriteIcon />}
                </IconButton>
              </Tooltip>
              
              <Tooltip title="View Full Product" placement="top">
                <IconButton
                  aria-label="view"
                  onClick={() => setIsModalOpen(true)}
                >
                  <PreviewIcon />
                </IconButton>
              </Tooltip>
              
              <Tooltip title={`Add ${figurine.name} to Cart!`} placement="top">
                <IconButton aria-label="add">
                  <AddShoppingCartIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title={`Buy ${figurine.name} now!`} placement="top">
                <IconButton aria-label="buy" className="ml-auto">
                  <StorefrontIcon />
                </IconButton>
              </Tooltip>
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>

      <FigurineModal
        images={["https://via.placeholder.com/600x400?text=Image+1", "https://via.placeholder.com/600x400?text=Image+2"]}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        details={figurine}
      />
    </>
  );
};

export default FigurineCard3d;
