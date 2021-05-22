import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import Post from "./Post/Post";
import makeStyles from "./styles";
import { useSelector } from "react-redux";

function Posts({setCurrentId}) {
  const classes = makeStyles();
  const posts = useSelector((state) => state.posts);

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
        {
            posts.map((post)=>(
                <Grid item key={post._id} xs={12} sm={6}>
                    <Post post={post} setCurrentId={setCurrentId}/>
                </Grid>
            ))
        }
    </Grid>
  );
}

export default Posts;
