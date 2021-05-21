import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";

function Home() {
  const [store, setStore] = useState([]);

  function reserch(nome) {
    axios
      .post("http://localhost:3335/produto", {
        nome: nome,
      })
      .then((resposta) => console.log(resposta.data));
  }

  const formik = useFormik({
    initialValues: {
      nome: "",
    },
    onSubmit: (value) => {
      reserch(value.nome);
      console.log(formik.values.nome);
      console.log();
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

        <button type="submit">Enviar</button>
      </form>
      <div>
        {/* Nome: {store[0].nome} <br></br> */}
        <br></br>
      </div>
    </div>
  );
}
export default Home;

// import React, { useState } from "react";
// import { useFormik } from "formik";
// const axios = require("axios");

// function Home() {
//   const [store, setStore] = useState([]);

//   function reserch(nome) {
//     fetch("http://localhost:3335/produto")
//       .then((row) => row.json())
//       .then((data) => {
//         setStore(data);
//         console.log(data);
//       });
//   }
//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       preco: "",
//       quantidade: "",
//     },
//     onSubmit: (values) => {
//       reserch(values);
//     },
//   });

//   return (
//     <div className="search">
//       <p>Search</p>

//       <form onSubmit={formik.handleSubmit}>
//         <label htmlFor="name">name:</label>
//         <input
//           id="name"
//           name="name"
//           type="text"
//           onChange={formik.handleChange}
//           value={formik.values.name}
//         />
//         <br></br>
//         {console.log(formik.values.name)}
//         {console.log(formik.values.preco)}
//         {console.log(formik.values.quantidade)}
//         <br></br>
//         <label htmlFor="preco">preço:</label>
//         <input
//           id="preco"
//           name="preco"
//           type="text"
//           onChange={formik.handleChange}
//           value={formik.values.preco}
//         />
//         <br></br>
//         <br></br>
//         <label htmlFor="quantidade">quantidade:</label>
//         <input
//           id="quantidade"
//           name="quantidade"
//           type="text"
//           onChange={formik.handleChange}
//           value={formik.values.quantidade}
//         />
//         <br></br>
//         <br></br>
//         <button type="submit">Enviar</button>
//       </form>
//       <div>
//         {/* Nome: {store.nome} <br></br> */}
//         <br></br>
//       </div>
//     </div>
//   );
// }
// export default Home;
