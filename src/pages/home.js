import React, { Children, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useStorage } from "../Context/store";

function Home({ children }) {
  const { store, setStore } = useStorage();

  async function reserch(nome, preco, quantidade) {
    await axios
      .post("http://localhost:3335/produto", {
        nome: nome,
        preco: preco,
        quantidade: quantidade,
      })
      .then((resposta) => console.log(resposta.data));
  }
  async function list() {
    await axios
      .get("http://localhost:3335/produto", {})
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
      preco: "",
      quantidade: "",
    },
    onSubmit: (value) => {
      reserch(value.nome, value.preco, value.quantidade);
    },
  });

  return (
    <div className="search">
      {children}
      <p>
        <b>Adicionar</b>
      </p>

      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="nome">nome:</label>
        <input
          id="nome"
          name="nome"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.nome}
        />
        <br></br>
        <br></br>
        <label htmlFor="preco">preço:</label>
        <input
          id="preco"
          name="preco"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.preco}
        />
        <br></br>
        <br></br>
        <label htmlFor="quantidade">quantidade:</label>
        <input
          id="quantidade"
          name="quantidade"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.quantidade}
        />
        <br></br>
        <br></br>
        <button type="submit">Enviar</button>
      </form>

      <hr></hr>
      <div>
        <p>
          <b>Mostrar ultimo</b>
        </p>
        Nome:{" "}
        <label>{store.length > 0 ? store[store.length - 1].nome : ""}</label>
        <br></br>
        <br></br>
        Preço:{" "}
        <label>{store.length > 0 ? store[store.length - 1].preco : ""}</label>
        <br></br>
        <br></br>
        Quantidade:{" "}
        <label>
          {store.length > 0 ? store[store.length - 1].quantidade : ""}
        </label>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
      <hr></hr>
      <div>
        <p>
          <b>Mostrar todos</b>
        </p>
        <label>
          {store.map((item) => {
            return (
              <ul>
                <li>
                  Nome:{item.nome}
                  <br></br>
                  Preco:{item.preco}
                  <br></br>
                  Quantidade:{item.quantidade}
                </li>
              </ul>
            );
          })}
        </label>
        <button onClick={() => list()}>Recarregar lista</button>
      </div>
    </div>
  );
}
export default Home;
