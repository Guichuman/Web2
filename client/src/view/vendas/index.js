import './vendas.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import api from "../../api/api"
import TableRowVendas from '../../components/TableRowVendas';
import { useNavigate } from 'react-router-dom'



function Vendas() {

  let navigate = useNavigate()

  const [listVenda, setListaVenda] = useState([])
  const token = localStorage.getItem("token")
  
  
  useEffect(() => {
    if(!token){
      navigate("/")
    }else{
      api.get("/vendas", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then((res) =>{
        setListaVenda(res.data)
      })
      .catch((erro) => {
        console.log(erro)
      })
    }
  }, [])

  return (
    <div>
      <Header />
        <div className='containerProdutos'>
            <div className='container'>
                <h1 className='h1Produtos'>Vendas</h1>
                <div className='containerFiltros'>
                  <Link className='btnCadastroVendas' to="/venda" >Cadastrar venda</Link>
                </div>
            </div>
            <div className='containerListagem'>
                <table className='tableProdutos'>
                    <tr className='cabecalhoTable'>
                        <th>ID</th>
                        <th>ID do produto</th>
                        <th>Desconto</th>
                        <th>Preço final</th>
                        <th>Ações</th>
                    </tr>
                    {listVenda.map(item => {
                        return  <TableRowVendas key={item.id} id={item.id} produtoId={item.produtoId} desconto={item.desconto} preco_final={item.preco_final}></TableRowVendas>
                      })}
                </table>
            </div>
        </div>
      <Footer />
    </div>
  );
}

export default Vendas;
