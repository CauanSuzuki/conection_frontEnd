import React, { useEffect } from "react";
import axios from "axios";
import { useStorage } from "../Context/store";
import {} from "./style.css";
import { useHistory } from "react-router-dom";

function Home({ children }) {
  const { store, setStore, del, setDel, ajuste,setAjuste } = useStorage();
  let history = useHistory();

  useEffect(() => {
    async function list() {
      axios
        .get("http://localhost:3333/produto", {})
        .then(function (result) {
          console.log("result data -->", result.data);
          setStore(result.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    list();
  }, []);

  function deletarTodos() {
    if (window.confirm("Você realmente deseja deletar todos?")) {
      axios.delete(`http://localhost:3333/produto`).then((res) => {
        {
          setStore([]);
        }

        console.log(res.data);
      });
    }
  }

  function deletarSelecionados(value) {
    axios.delete(`http://localhost:3333/produto/${value}`).then((res) => {
      setStore(store.filter((value, id) => value !== store.id));
      setStore(...store);

      console.log(res.data);
    });
  }

  const redirecionarDeletar = (item) => {
    history.push(`/deletar/${item}`);
  };
  const redirecionarAlterar = (item) => {
    history.push(`/alterar/${item}`);
  };
  const redirecionarCadastrar = () => {
    history.push(`/cadastro`);
  };
  console.log("del -->", del);
  return (
    <div className="conteudo">
      <label>
        {store.map((item) => {
          console.log(item);
          return (
            <>
              <div className="wrapper">
                <div className="nome">
                  <input
                    type="checkbox"
                    value={item.id}
                    onChange={(event) => setDel(event.target.value, ...del)}
                  />
                  {item.nome}
                </div>

                <div className="modelo">{item.modelo}</div>

                <div className="preco">{item.preco}</div>

                <div className="quantidade">{item.quantidade}</div>
                <div className="acoes">
                  <button onClick={() => redirecionarDeletar(item.id)}>
                    DELETAR
                  </button>
                  <br></br>
                  <button onClick={() => redirecionarAlterar(item.id)}>
                    ALTERAR
                  </button>
                </div>
              </div>
              <hr></hr>
            </>
          );
        })}
      </label>
      <div>
        <button onClick={() => redirecionarCadastrar()}>Cadastrar</button>
        <button onClick={() => deletarTodos()}>Deletar Todos</button>
        <button onClick={() => deletarSelecionados(del)}>
          Deletar Selecionados
        </button>
      </div>
    </div>
  );
}
export default Home;
