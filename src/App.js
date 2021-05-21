import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import PageHome from "./pages/home";

function App() {
  return (
    <Router>
      <div>
        <header>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </header>

        <Switch>
          <Route exact path="/" component={PageHome}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
