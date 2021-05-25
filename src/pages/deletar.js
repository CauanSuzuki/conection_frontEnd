import React from "react";
import axios from "axios";
import { useStorage } from "../Context/store";

const formik = require("formik");

function Alterar({ Children }) {
  const { store, setStore } = useStorage();
  function funcaoDeletar(value) {
    axios.delete(`http://localhost:3333/produto/${value}`).then((res) => {
      setStore(store.filter((value, id) => value !== store.id));
      console.log(res);
      console.log(res.data);
    });
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

              <button onClick={() => funcaoDeletar(item.id)}>Remover</button>
            </ul>
          );
        })}
      </label>
      <button onClick={() => list()}>Recarregar lista</button>
    </div>
  );
}

export default Alterar;
