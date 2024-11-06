// src/components/ui/figurineCard.jsx
import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

const MediaCard = ({ figurine }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={figurine.image}
        title={figurine.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {figurine.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Origin: {figurine.origin} <br />
          Classification: {figurine.classification} <br />
          Price: ${figurine.price}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default MediaCard;
