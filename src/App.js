import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Movies from "./components/Movies";
import Customers from "./components/Customers";
import Rentals from "./components/Rentals";
import NotFound from "./components/NotFound";
import NavBar from "./components/NavBar";
import MovieForm from "./components/MovieForm";
import LoginForm from "./components/common/loginForm";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <div className="content">
          <Switch>
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/movies/:id">
              <MovieForm />
            </Route>
            <Route path="/movies">
              <Movies />
            </Route>
            <Route path="/customers">
              <Customers />
            </Route>
            <Route path="/rentals">
              <Rentals />
            </Route>
            <Route path="/not-found">
              <NotFound />
            </Route>
            <Route exact path="/" render={() => <Redirect to="/movies" />} />
            <Route render={() => <Redirect to="/not-found" />} />
          </Switch>
        </div>
      </main>
    </React.Fragment>
  );
}

export default App;
