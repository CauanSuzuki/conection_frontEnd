// const axios = require("axios");
// const formik = require("formik");
// const { store, setStore } = require("../Context/store");

// exports.reserch = async (nome, modelo, preco, quantidade) => {
//   axios
//     .post("http://localhost:3333/produto", {
//       nome: nome,
//       modelo: modelo,
//       preco: preco,
//       quantidade: quantidade,
//     })
//     .then((resposta) => console.log(resposta.data));
// };

// exports.list = async () => {
//   axios
//     .get("http://localhost:3333/produto", {})
//     .then(function (result) {
//       setStore(result.data);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

// exports.funcaoDeletar = async (value) => {
//   axios.delete(`http://localhost:3333/produto/${value}`).then((res) => {
//     setStore(store.filter((value, id) => value !== store.id));
//     console.log(res);
//     console.log(res.data);
//   });
// };

// exports.funcaoAlterar = async (item) => {
//   return axios
//     .put(`http://localhost:3333/produto/${item.id}`, {
//       id: item.id,
//       nome: formik.values.nome,
//       modelo: formik.values.modelo,
//       preco: formik.values.preco,
//       quantidade: formik.values.quantidade,
//     })
//     .then((res) => {
//       console.log(res);
//       console.log(res.data);
//     });
// };
