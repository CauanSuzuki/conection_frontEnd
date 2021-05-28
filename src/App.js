import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import PageHome from "./pages/home";
import PageCadastro from "./pages/cadastro";
import PageDeletar from "./pages/deletar";
import PageAlterar from "./pages/alterar";

function App() {
  return (
    <Router>
      <div>
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
