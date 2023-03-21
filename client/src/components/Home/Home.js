import React from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import Form from "../Form/Form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Invoice from './Invoice';
import TodaySale from './TodaySale';
const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  // const classes = useStyles();

  useEffect(() => {
    // dispatch(getLaundry());
    // console.log()
  }, [dispatch]);
  return (
    <Grow in>
      <Container  >
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
          style={{ background: 'white' }}
        >
          <Grid item xs={12} sm={7}>
            <TodaySale />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Invoice />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};
export default Home;
