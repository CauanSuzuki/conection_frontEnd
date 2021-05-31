import React, { useEffect } from "react";
import axios from "axios";
import { useStorage } from "../Context/store";
import {} from "./style.css";
import { useHistory } from "react-router-dom";

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
  }, [setStore]);

  function deletarTodos() {
    if (window.confirm("Você realmente deseja deletar todos?")) {
      axios.delete(`http://localhost:3333/produto`).then((res) => {
        setStore([]);
      });
    }
  }

  async function deletarSelecionados() {
    console.log("del ---> ", del);
    
    del.forEach(async d => {
      await axios
      .delete(
        `http://localhost:3333/prod/:${d}`
      )
      .then((res) => {
        setStore((prevState) =>
          prevState.filter((i) => !del.some((d) => d.id === i.id))
        )
        console.log("result data -->", d);
      });   
    });
  }
  

  const handleSelect = (id) => {
    //se houver vou desmarcar
    if (del.includes(id)) {
      setDel((prevState) => prevState.filter((i) => i !== id));
      return;
    }
    //se não houver vou marcar
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
        <button onClick={() => redirecionarCadastrar()}>Cadastrar</button>
        <button onClick={() => deletarTodos()}>Deletar Todos</button>
        <button onClick={deletarSelecionados}>Deletar Selecionados</button>
      </div>
    </div>
  );
}
export default Home;
