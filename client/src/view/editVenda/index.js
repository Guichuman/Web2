import { useState, useEffect } from 'react';
import api from "../../api/api"
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigate, useLocation } from 'react-router-dom'

function CadastroVenda(props) {

  const [desconto, setDesconto] = useState()
  const [precoFinal, setPrecoFinal] = useState()
  const [produto, setProduto] = useState()
  const [produtoId, setProdutoId] = useState()
  const [listaProduto, setListaProduto] = useState([])

  const [erro, setErro] = useState()
  const [msgErro, setMsgErro] = useState()
  const [spin, setSpin] = useState(false)
  const [visibleBtn, setVisibleBtn] = useState(true)

  const navigate = useNavigate()
  const location = useLocation();
  const propsData = location.state.venda

  useEffect(() => {
    setDesconto(propsData.desconto)
    setPrecoFinal(propsData.preco_final)
    setProdutoId(propsData.produtoId)
    api.get("/produtos")
    .then((res) =>{
      setListaProduto(res.data)
    })
    .catch((erro) => {
      console.log(erro)
    })
  }, [])

  const handleInputChange = (selectedId) => {
    setProdutoId(selectedId)
  }

  const deleteVenda = async () => {
    if(window.confirm("Deseja excluir essa venda?")){
      api.delete("/vendas/"+propsData.id)
      .then(res => {
          navigate("/vendas")
      }).catch(err => {
          setErro(true)
          setMsgErro("Não foi possivel excluir a venda")
  
          console.log(err)
      })
    }
  }

   const update  = async () => {

    setSpin(true)
    setVisibleBtn(false)

    api.put("/vendas/"+propsData.id, {
      produtoId: produtoId,
      desconto: desconto,
      preco_final: precoFinal,
    }).then(res => {
      navigate("/vendas")
    }).catch(err => {
        if(!desconto || !precoFinal){
            setErro(true)
            setMsgErro("Preencha todos os campos")
        }else{
            setErro(true)
            setMsgErro("Dados incorretos, verifique os campos")
        }

        console.log(err)
    }).finally(() => {
      setSpin(false)
      setVisibleBtn(true)
    })
  }

  return (
    <div>
        <Header />
        <div className="containerCadastroUser">
        <div className="formCadastroProduto">
            <label className='h1Produtos'>Edição de venda</label>
            <div className='containerInputs01'>
                <label className='labelCadastroProduto'>Produto</label>
                <select placeholder="Insira o nome" required style={{marginTop: 25}} value={produtoId} className="inputCadastroProduto inputGiga select" onChange={(e) => handleInputChange(e.target.value)}>
                  {listaProduto.map((item) => {
                    
                    return <option key={item.id} value={item.id}> {item.nome} </option>
                  })}
                </select>
            </div>
            <div className='containerInputs01'>
                <label className='labelCadastroProduto' style={{fontSize: 18}}>Desconto</label>
                <input placeholder="0%" value={desconto} required type="number" className="inputCadastroProduto inputPequeno removeSetaInput" onChange={(e) => setDesconto(e.target.value)}/>
                <label className='labelCadastroProduto' style={{fontSize: 18}}>Preço total</label>
                <input placeholder="00" value={precoFinal} required type="number" className="inputCadastroProduto inputPequeno removeSetaInput" onChange={(e) => setPrecoFinal(e.target.value)}/>
            </div>
            <div className='containerRowBtn'>
              { visibleBtn ? <button className="btnGreen btn" type='submit' style={{marginRight: 30}} onClick={update}>Cadastrar</button> : ""}
              <button className='btnDelete' onClick={deleteVenda} >Excluir venda</button>
            </div>

            { erro ? <span className='spanErro'>{msgErro}</span> : ""}
            { spin ? <div class="spinner"></div> : ""}
        </div>
        </div>
        <Footer />
    </div>
  );
}

export default CadastroVenda;
