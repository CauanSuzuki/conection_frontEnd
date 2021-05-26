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
import PageCadastro from "./pages/cadastro";
import PageDeletar from "./pages/deletar";
import PageAlterar from "./pages/alterar";

function App() {
  return (
    <Router>
      <div>
        <header>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cadastro">Cadastro</Link>
            </li>
            <li>
              <Link to="/deletar">Deletar</Link>
            </li>
            <li>
              <Link to="/alterar">Alterar</Link>
            </li>
          </ul>
        </header>

        <Switch>
          <Route exact path="/" component={PageHome}></Route>
          <Route exact path="/cadastro" component={PageCadastro}></Route>
          <Route exact path="/deletar/:id" component={PageDeletar}></Route>
          <Route exact path="/alterar/:id" component={PageAlterar}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
