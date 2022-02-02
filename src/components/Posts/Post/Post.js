import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";

// action
import { deletePost, likePost } from "../../../actions/posts";

import { createStyles, makeStyles } from "@mui/styles";
const useStyles = makeStyles(() =>
  createStyles({
    media: {
      height: 0,
      paddingTop: "56.25%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      backgroundBlendMode: "darken",
    },
    border: {
      border: "solid",
    },
    fullHeightCard: {
      height: "100%",
    },
    card: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      borderRadius: "15px",
      height: "100%",
      position: "relative",
    },
    overlay: {
      position: "absolute",
      top: "20px",
      left: "20px",
      color: "white",
    },
    overlay2: {
      position: "absolute",
      top: "20px",
      right: "20px",
      color: "white",
    },
    grid: {
      display: "flex",
    },
    details: {
      display: "flex",
      justifyContent: "space-between",
      margin: "20px",
    },
    title: {
      padding: "0 16px",
    },
    cardActions: {
      padding: "0 16px 8px 16px",
      display: "flex",
      justifyContent: "space-between",
    },
  })
);

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        alt={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {(user?.result?.googleId === post?.creator ||
        user?.result?._id === post?.creator) && (
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => setCurrentId(post._id)}
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
      )}

      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag}`)}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color={"textSecondary"} component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(likePost(post._id))}
          disabled={!user?.result}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" />
            DELETE
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
