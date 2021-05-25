import React from "react";
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
    <div className="mostarTdoso">
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
            </ul>
          );
        })}
      </label>
      <button onClick={() => list()}>Recarregar lista</button>
    </div>
  );
}
export default Home;
