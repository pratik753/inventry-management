import React from "react";
import { Container } from "@material-ui/core";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import NavBar from "./components/nav_bar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import AddProduct from './components/Home/AddProduct'

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/addProduct" exact component={AddProduct} />

        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
