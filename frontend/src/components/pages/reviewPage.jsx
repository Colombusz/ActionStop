import React, { useEffect, useState } from 'react';
import { fetchMyReviews } from '../store/reviewSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Rating,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material';
import {Filter} from 'bad-words'
import EditIcon from '@mui/icons-material/Edit';
import MainNavbar from "../common/navbar";
import ResponsiveFooter from "../common/footer";
import { updateReview } from '../store/reviewSlice';
const ReviewPage = () => {
  const id = JSON.parse(localStorage.getItem('user'))._id;
  const dispatch = useDispatch();

  // Fetch reviews once when the component mounts
  useEffect(() => {
    dispatch(fetchMyReviews(id));
  }, [dispatch, id]); // Add dependencies to avoid unnecessary re-renders
  const customFilter = new Filter({ placeHolder: 'x' })
  
  const reviews = useSelector((state) => state.review.myreviews.data);
  const review = customFilter.clean(reviews);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [editedRating, setEditedRating] = useState(0);
  const [editedComment, setEditedComment] = useState('');

  const handleEditClick = (review) => {
    setSelectedReview(review);
    setEditedRating(review.rating);
    setEditedComment(review.comment);
    

    setEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    console.log('Save changes:', selectedReview._id);
    console.log('Rating:', editedRating);
    console.log('Comment:', editedComment);
    console.log(editedComment, editedRating, selectedReview._id);
    const id = selectedReview._id;
    const rating = editedRating;
    const comment = editedComment

    const payload = {
        id: id,
        rating: rating,
        comment: comment,
    };
    dispatch(updateReview(payload));
    setEditModalOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <MainNavbar />
      
      <Container maxWidth="md" sx={{ mt: 12, mb: 4, flex: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
          My Reviews
        </Typography>

        {/* Reviews List */}
        {review && review.length > 0 ? (
          review.map((review) => (
            <Card key={review.id} sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {review.figurine.name} - Review id: {review._id}
                    </Typography>
                    
                    <Rating value={review.rating} readOnly sx={{ mb: 1 }} />
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      Comment: {review.comment}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Reviewed on {new Date(review.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <IconButton onClick={() => handleEditClick(review)} color="primary">
                    <EditIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            No reviews available.
          </Typography>
        )}

        {/* Edit Review Modal */}
        <Dialog 
          open={editModalOpen} 
          onClose={() => setEditModalOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Edit Review</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                {selectedReview?.figurine.name}
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography component="legend">Rating</Typography>
                <Rating
                  value={editedRating}
                  onChange={(_, newValue) => setEditedRating(newValue)}
                />
              </Box>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Review"
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
                variant="outlined"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit} variant="contained">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </Container>

      <ResponsiveFooter />
    </Box>
  );
};

export default ReviewPage;
