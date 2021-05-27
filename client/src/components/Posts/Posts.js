import React from "react";
import { Grid, CircularProgress,Paper} from "@material-ui/core";
import Post from "./Post/Post";
import makeStyles from "./styles";
import { useSelector } from "react-redux";

function Posts({setCurrentId}) {
  const classes = makeStyles();
  const {posts,isLoading} = useSelector((state) => state.posts);

  if(!posts?.length && !isLoading) return <Paper style={{padding:'15px'}}>No post to show</Paper>;

  return isLoading ? <CircularProgress/> : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
        {
            posts.map((post)=>(
                <Grid item key={post._id} xs={12} sm={12} md={6} lg={3}>
                    <Post post={post} setCurrentId={setCurrentId}/>
                </Grid>
            ))
        }
    </Grid>
  );
}

export default Posts;
