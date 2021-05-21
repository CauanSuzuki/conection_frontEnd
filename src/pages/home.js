import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";

function Home() {
  const [store, setStore] = useState([]);

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
      <p>Search</p>

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
        <button type="submit">Enviar</button>
      </form>

      <hr></hr>
      <div>
        Nome:{" "}
        <input
          value={store.length > 0 ? store[store.length - 1].nome : ""}
        ></input>
        Preço:{" "}
        <input
          value={store.length > 0 ? store[store.length - 1].preco : ""}
        ></input>
        Nome:{" "}
        <input
          value={store.length > 0 ? store[store.length - 1].quantidade : ""}
        ></input>
        <button onClick={() => list()}>Recarregar lista</button>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}
export default Home;
