import React from "react";
import axios from "axios";
import { useStorage } from "../Context/store";
import { useHistory, useParams } from "react-router-dom";

function Deletar({ Children }) {
  const { store, setStore } = useStorage();
  let identificar = useParams();
  let history = useHistory();
  const redirecionarHome = () => {
    history.push("/");
  };

  function funcaoDeletar(value) {
    axios.delete(`http://localhost:3333/produto/${value}`).then((res) => {
      redirecionarHome();
      setStore(store.filter((value, id) => value !== store.id));

      console.log(res.data);
    });
  }

  return (
    <div className="deletarUm">
      <p>
        <b>Deletar</b>
      </p>
      <label>
        <p>´Deseja deletar ID {identificar.id} </p>
      </label>
      <button onClick={() => funcaoDeletar(identificar.id)}>Confirmar</button>
      <button onClick={() => redirecionarHome()}>Cancelar</button>
    </div>
  );
}

export default Deletar;
