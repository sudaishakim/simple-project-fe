import React, { useEffect, useState } from "react";
import Post from "./Post/Post";
import { CircularProgress, Grid } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() =>
  createStyles({
    mainContainer: {
      display: "flex",
      alignItems: "center",
    },
    smMargin: {
      margin: "4px",
    },
    actionDiv: {
      textAlign: "center",
    },
  })
);

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);

  return (
    <>
      {!posts.length ? (
        <CircularProgress />
      ) : (
        <Grid
          className={classes.mainContainer}
          container
          alignItems="stretch"
          spacing={3}
        >
          {posts.map((p) => {
            return (
              <Grid key={p._id} item xs={12} sm={6}>
                <Post post={p} setCurrentId={setCurrentId} />
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default Posts;
