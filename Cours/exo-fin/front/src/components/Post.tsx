import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useState, type FC } from "react";
import type { Post as PostProps } from "../../../types";
import { patchPost } from "../utils/api";

const Post: FC<PostProps> = ({
  img,
  title,
  description,
  likes,
  _id,
  author,
}) => {
  const [localLikes, setLocalLikes] = useState(likes);
  const plusOneLike = async () => {
    try {
      await patchPost(_id, { likes: likes + 1 });
      setLocalLikes((l) => l + 1);
    } catch (error) {
      console.log("une erreur s'est pruduite");
    }
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="160"
          image={img}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={plusOneLike} aria-label="add to favorites">
            <FavoriteIcon />
            {localLikes}
          </IconButton>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
export default Post;
