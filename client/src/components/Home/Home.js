import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Grow, Grid } from "@material-ui/core";

// component imports
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import { getPosts } from "../../actions/posts";
function Home() {

  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
    return (
        <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    )
}

export default Home
