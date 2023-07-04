import './produtos.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import api from "../../api/api"
import { useNavigate } from 'react-router-dom'
import { React, Fragment } from "react"
import TableRow from '../../components/TableRow';
import ModalDelete from '../../components/ModalDelete';

function Produtos() {

  let navigate = useNavigate()
  const [listaProduto, setListaProduto] = useState([])
  const [busca, setBusca] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    api.get("/produtos")
    .then((res) =>{
      setListaProduto(res.data)
    })
    .catch((erro) => {
      console.log(erro)
    })
  }, [])


  const buscaProduto = async () => {
    if(busca !== ""){
      api.get("/produtos/"+busca)
      .then((res) => {
        setListaProduto(res.data)
      })
      .catch((erro) => {
        console.log(erro)
      })
    }else{
      api.get("/produtos")
      .then((res) =>{
        setListaProduto(res.data)
      })
      .catch((erro) => {
        console.log(erro)
      })
    }
  }

  
  
  return (
    <div>
      <Header />
        <div className='containerProdutos'>
            <h1 className='h1Produtos'>Produtos</h1>
            <div className='containerFiltros'>
                <input placeholder='Busque por nome' className='inputSearch' value={busca} onChange={(e) => setBusca(e.target.value)}  />
                <button className='btnFiltro' onClick={buscaProduto} >Buscar</button>
                <Link className='btnCadastro' to="/produto" >Cadastrar produto</Link>
            </div>
            <div className='containerListagem'>
    
                <table className='tableProdutos'>
                    <tr className='cabecalhoTable'>
                        <th className='cabecalhoId'>ID</th>
                        <th className='cabecalhoId'>Nome</th>
                        <th className='cabecalhoId'>Tamanho</th>
                        <th className='cabecalhoId'>Cor</th>
                        <th className='cabecalhoId'>Preço</th>
                        <th className='cabecalhoId'>Quantidade</th>
                        <th className='cabecalhoId'v>Ações</th>
                    </tr>
                      {listaProduto.map(item => {
                        return  <TableRow key={item.id} id={item.id} nome={item.nome} tamanho={item.tamanho} cor={item.cor} preco={item.preco} quantidade={item.quantidade}></TableRow>
                      })}
                </table>
                {isModalOpen && <ModalDelete closeModal={() => setIsModalOpen(false)}/>}
            
            </div>
        </div>
      <Footer />
    </div>
  );
}

export default Produtos;
