import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useStorage } from "../Context/store";
import {} from './style.css' 

function Home({ children }) {
  const { store, setStore } = useStorage();

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

  return (
    // <div class="wrapper">
    //   <div>One</div>
    //   <div>Two</div>
    //   <div>Three</div>
    //   <div>Four</div>
    //   <div>Five</div>
    // </div>
    <div className="conteudo">
      <label>
        {store.map((item) => {
          return (
            <div className="wrapper">
              <div className="nome">Nome:{item.nome}</div>

              <div className="modelo">Modelo:{item.modelo}</div>

              <div className="preco">Preco:{item.preco}</div>

              <div className="quantidade">Quantidade:{item.quantidade}</div>
              <hr></hr>
            </div>
          );
        })}
      </label>
      <button onClick={() => list()}>Recarregar lista</button>
    </div>
  );
}
export default Home;
