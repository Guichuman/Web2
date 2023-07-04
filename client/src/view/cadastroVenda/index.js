import './cadastroVenda.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import api from "../../api/api"
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function CadastroVenda() {

  let navigate = useNavigate()
  const [desconto, setDesconto] = useState()
  const [precoFinal, setPrecoFinal] = useState()
  const [produto, setProduto] = useState()
  const [produtoId, setProdutoId] = useState()

  const [erro, setErro] = useState()
  const [msgErro, setMsgErro] = useState()
  const [spin, setSpin] = useState(false)
  const [visibleBtn, setVisibleBtn] = useState(true)
  const [listaProduto, setListaProduto] = useState([])

  useEffect(() => {
    api.get("/produtos")
    .then((res) =>{
      setListaProduto(res.data)
      //setProdutoId(listaProduto[0].id)
    })
    .catch((erro) => {
      console.log(erro)
    })
  }, [])

  const handleInputChange = (selectedId) => {
    setProdutoId(selectedId)
  }

  const create  = async () => {

    setSpin(true)
    setVisibleBtn(false)

    if(!desconto || !precoFinal){
      setErro(true)
      setMsgErro("Preencha todos os campos")
    }else{
      api.post("/vendas", {
        produtoId: produtoId,
        desconto: desconto,
        preco_final: precoFinal,
      }).then(res => {
        navigate("/vendas")
      }).catch(err => {
          setErro(true)
          setMsgErro("Dados incorretos, verifique os campos")
          setSpin(false)
          console.log(err)
      })
    
      setSpin(false)
      setVisibleBtn(true)
    }
  }

  return (
    <div>
        <Header />
        <div className="containerCadastroUser">
        <div className="formCadastroProduto">
            <label className='h1Produtos'>Cadastro de venda</label>
            <div className='containerInputs01'>
                <label className='labelCadastroProduto'>Produto</label>
                <select placeholder="Insira o nome" required style={{marginTop: 25}} className="inputCadastroProduto inputGiga" onChange={(e) => setProdutoId(e.target.value)}>
                  {listaProduto.map((item) => {
                    return <option key={item.id} value={item.id}>{item.nome}</option>
                  })}
                </select>
            </div>
            <div className='containerInputs01'>
                <label className='labelCadastroProduto' style={{fontSize: 18}}>Desconto</label>
                <input placeholder="0%" required type="number"  className="inputCadastroProduto inputPequeno removeSetaInput" onChange={(e) => setDesconto(e.target.value)}/>
                <label className='labelCadastroProduto' style={{fontSize: 18}}>Preço total</label>
                <input placeholder="00" required type="number" className="inputCadastroProduto inputPequeno removeSetaInput" onChange={(e) => setPrecoFinal(e.target.value)}/>
            </div>
            { erro ? <span className='spanErro'>{msgErro}</span> : ""}
            { spin ? <div class="spinner"></div> : ""}
            { visibleBtn ? <button className="btnCadastroUser btn" type='submit' onClick={create}>Cadastrar</button> : ""}
        </div>
        </div>
        <Footer />
    </div>
  );
}

export default CadastroVenda;
