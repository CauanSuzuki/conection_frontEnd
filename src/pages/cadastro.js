//toda parte de adicionar
import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Cadastro({ children }) {
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
  let history = useHistory();
  const redirecionarHome = () => {
    history.push("/");
  };
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

  return (
    <div className="principal">
      {children}
      <p>
        <b>Adicionar</b>
      </p>
      <div className="adicionar">
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

          <button type="submit">Cadastrar</button>
          <button onClick={() => redirecionarHome()}>Home</button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
