import React, { Children, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useStorage } from "../Context/store";

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

  function funcaoDeletar(value) {
    axios.delete(`http://localhost:3333/produto/${value}`).then((res) => {
      setStore(store.filter((value, id) => value !== store.id));
      console.log(res);
      console.log(res.data);
    });
  }
  function funcaoAlterar(item) {
    axios
      .put(
        `http://localhost:3333/produto/${item.id}`,
        {
          id:item.id,
          nome: formik.values.nome,
          modelo: formik.values.modelo,
          preco: formik.values.preco,
          quantidade: formik.values.quantidade,
        }
        // setStore(
        //   store.map((value, index) =>
        //     value.id === item.id
        //       ? {
        //           id: item.id,
        //           nome: formik.values.nome,
        //           modelo: formik.values.modelo,
        //           preco: formik.values.preco,
        //           quantidade: formik.values.quantidade,
        //         }
        //       : {
        //           id: value.id,
        //           nome: value.nome,
        //           modelo: value.modelo,
        //           preco: value.preco,
        //           quantidade: value.quantidade,
        //         }
        //   )
        // )
      )
      .then((res) => {
        // setStore(...store)
        console.log(res);
        console.log(res.data);
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
        <label htmlFor="modelo">modelo:</label>
        <input
          id="modelo"
          name="modelo"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.modelo}
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
        Modelo:{" "}
        <label>{store.length > 0 ? store[store.length - 1].modelo : ""}</label>
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
                  Modelo:{item.modelo}
                  <br></br>
                  Preco:{item.preco}
                  <br></br>
                  Quantidade:{item.quantidade}
                </li>
                <button onClick={() => funcaoDeletar(item.id)}>Remover</button>
                <button onClick={() => funcaoAlterar(item)}>Alterar</button>
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
