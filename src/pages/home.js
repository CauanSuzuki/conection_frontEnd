import React, { useEffect } from "react";
import axios from "axios";
import { useStorage } from "../Context/store";
import {} from "./style.css";
import ReactDOM, { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

function Home({ children }) {
  const { store, setStore, del, setDel } = useStorage();
  let history = useHistory();

  useEffect(() => {
    async function list() {
      axios
        .get("http://localhost:3333/produto", {})
        .then(function (result) {
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
        setStore([]);
      });
    }
  }

  async function deletarSelecionados() {
    del.forEach(async (d) => {
      console.log(d);
      await axios.delete(`http://localhost:3333/prod/${d}`);
    });

    const novoStore = store.reduce((acc, cur) => {
      if (del.some((item) => item == cur.id)) return acc;

      return [...acc, cur];
    }, []);

    setStore(novoStore);
    setDel([]);
  }

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const handleSelect = (id) => {
    if (del.includes(id)) {
      setDel((prevState) => prevState.filter((i) => i !== id));
      return;
    }
    setDel((prevState) => [...prevState, id]);
  };

  const redirecionarDeletar = (item) => {
    history.push(`/deletar/${item}`);
  };
  const redirecionarAlterar = (item) => {
    history.push(`/alterar/${item}`);
  };
  const redirecionarCadastrar = () => {
    history.push(`/cadastro`);
  };
  return (
    <div className="conteudo">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <label>
        {store.map((item) => (
          <div key={item.id}>
            <div className="wrapper">
              <div className="nome">
                <input
                  type="checkbox"
                  value={item.id}
                  onChange={() => {
                    handleSelect(item.id);
                  }}
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
          </div>
        ))}
      </label>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => redirecionarCadastrar()}
        >
          Cadastrar
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => deletarTodos()}
        >
          Deletar Todos
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => deletarSelecionados()}
        >
          Deletar Selecionados
        </Button>
      </div>
    </div>
  );
}
export default Home;
