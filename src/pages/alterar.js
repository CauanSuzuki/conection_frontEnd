import React, { useEffect } from "react";
import axios from "axios";
import { useStorage } from "../Context/store";
import { useHistory, useParams } from "react-router-dom";
import { useFormik } from "formik";

function Alterar({ Children }) {
  let identificar = useParams();
  const {rotativo, setRotativo } = useStorage();

  let history = useHistory();
  const redirecionarHome = () => {
    history.push("/");
  };

  useEffect(() => {
    async function listarUm() {
      axios
        .get(`http://localhost:3333/produto/${identificar.id}`, {})
        .then(function (result) {
          setRotativo(result.data);
          console.log(result.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    listarUm();
  }, [setRotativo,identificar.id]);

  async function funcaoAlterar(item) {
    await axios
      .put(`http://localhost:3333/produto/${identificar.id}`, {
        nome: formik.values.nome,
        modelo: formik.values.modelo,
        preco: formik.values.preco,
        quantidade: formik.values.quantidade,
      })
      .then((res) => {
        redirecionarHome();
        console.log(res);
        console.log(res.data);
      });
  }

  const formik = useFormik({
    initialValues: {
      nome: rotativo.nome,
      modelo: rotativo.modelo,
      preco: rotativo.preco,
      quantidade: rotativo.quantidade,
    },
    enableReinitialize: true,
    onSubmit: (identificar) => {
      funcaoAlterar(identificar);
    },
  });

  return (
    <div>
      <p>
        <b>Alterar</b>
      </p>
      <label>
        <p>´Deseja deletar ID {identificar.id} </p>
      </label>
      <div>
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
          <button type="submit">Confirmar</button>
        </form>
      </div>
      <button onClick={() => redirecionarHome()}>Cancelar</button>
    </div>
  );
}

export default Alterar;
