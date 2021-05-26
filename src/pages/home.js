import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useStorage } from "../Context/store";
import {} from "./style.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import PageCadastro from "./cadastro";
import PageDeletar from "./deletar";
import PageAlterar from "./alterar";

function Home({ children }) {
  const { store, setStore } = useStorage();
  let history = useHistory();

  function reserch(nome, modelo, preco, quantidade) {
    axios
      .post("http://localhost:3333/produto", {
        nome: nome,
        modelo: modelo,
        preco: preco,
        quantidade: quantidade,
      })
      .then((resposta) => console.log(resposta.data));
  }
  function list() {
    axios
      .get("http://localhost:3333/produto", {})
      .then(function (result) {
        setStore(result.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const formik = useFormik({
    initialValues: {
      nome: "",
      modelo: "",
      preco: "",
      quantidade: "",
    },
    onSubmit: (value) => {
      reserch(value.nome, value.modelo, value.preco, value.quantidade);
    },
  });

  const redirecionarDeletar= (item) => {
    history.push(`/deletar/${item}`);
  };
  const redirecionarAlterar= (item) => {
    console.log(item)
    history.push(`/alterar/${item}`);
    
  };
 

  return (
    <div className="conteudo">
      <label>
        {store.map((item) => {
          return (
            <>
              {" "}
              <div className="wrapper">
                <div className="nome">{item.nome}</div>

                <div className="modelo">{item.modelo}</div>

                <div className="preco">{item.preco}</div>

                <div className="quantidade">{item.quantidade}</div>
                <div className="acoes">
                  <button onClick={() => redirecionarDeletar(item.id)}>DELETAR</button>
                  <br></br>
                  <button onClick={() => redirecionarAlterar(item.id)}>ALTERAR</button>
                </div>
              </div>
              <hr></hr>
            </>
          );
        })}
      </label>
      <button onClick={() => list()}>Recarregar lista</button>
    </div>
  );
}
export default Home;
