import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './view/login';
import Home from './view/home';
import Produtos from './view/produtos';
import Vendas from './view/vendas';
import About from './view/about';
import Contato from './view/contato';
import App from "./App"
import CadastroUsuario from './view/cadastroUsuario';
import Routes from './App';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />
      },
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/user",
        element: <CadastroUsuario />
      },
      {
        path: "/produto",
        element: <Produtos />
      },
      {
        path: "/venda",
        element: <Vendas />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/contato",
        element: <Contato />
      }
    ]
  }
  
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
);

