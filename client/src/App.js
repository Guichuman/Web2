import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './view/login';
import Home from './view/home';
import About from './view/about';
import Produtos from './view/produtos';
import Vendas from './view/vendas';
import Contato from './view/contato';
import CadastroUsuario from './view/cadastroUsuario';
import CadastroProduto from './view/cadastroProduto'
import CadastroVenda from './view/cadastroVenda';
import EditProduto from './view/editProduto';
import EditVenda from './view/editVenda'
import Conta from './view/conta';
import VerificaPassword from './view/verificaPassword';
import EditPassword from './view/editPassword';

const Rotas = () => {

  /*const verificatoken = async (to, from, next) => {
    if(localStorage.getItem("token") != undefined){
      var req = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
  
      api.post("/validate", req)
        .then(res => {
              console.log(res)
              next("/home")
          }).catch(err => {
              console.log(err)
              next("/")
          })
      } else {
          next("/")
      }
  }*/

  return(
    
    <Router>
      <Routes>
        <Route Component={Login} path='/' exact />
        <Route Component={Home} path='/home' />
        <Route Component={About} path='/about' />
        <Route Component={Produtos} path='/produtos' />
        <Route Component={Vendas} path='/vendas' />
        <Route Component={Contato} path='/contato' />
        <Route Component={Contato} path='/contato' />
        <Route Component={CadastroUsuario} path='/user' />
        <Route Component={CadastroProduto} path='/produto' />
        <Route Component={CadastroVenda} path='/venda' />
        <Route Component={EditProduto} path='/editProduto' />
        <Route Component={EditVenda} path='/editVenda' />
        <Route Component={Conta} path='/conta' />
        <Route Component={VerificaPassword} path='/verificaPassword' />
        <Route Component={EditPassword} path='/editPassword' />
      </Routes>
    </Router>
  )
}

export default Rotas