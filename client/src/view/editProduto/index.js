import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import api from "../../api/api"
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './editProduto.css';


function EditProduto(props) {

  const [nome, setNome] = useState()
  const [cor, setCor] = useState()
  const [tamanho, setTamanho] = useState()
  const [preco, setPreco] = useState()
  const [quantidade, setQuantidade] = useState()
  const [erro, setErro] = useState()
  const [msgErro, setMsgErro] = useState()
  const [spin, setSpin] = useState(false)
  const [visibleBtn, setVisibleBtn] = useState(true)
 
  const navigate = useNavigate()
  const location = useLocation();
  const propsData = location.state.produto
  
  useEffect(() => {
    setNome(propsData.nome)
    setCor(propsData.cor)
    setTamanho(propsData.tamanho)
    setPreco(propsData.preco)
    setQuantidade(propsData.quantidade)

  }, [])

  const deleteProduto = async () => {
    if(window.confirm("Deseja excluir esse produto?")){
      api.delete("/produtos/"+propsData.id)
      .then(res => {
          navigate("/produtos")
      }).catch(err => {
          setErro(true)
          setMsgErro("Não foi possivel excluir o produto")
  
          console.log(err)
      })
    }
  }

   const updateProduto  = async () => {

    setSpin(true)
    setVisibleBtn(false)

    api.put("/produtos/"+propsData.id, {
      nome: nome,
      cor: cor,
      tamanho: tamanho,
      preco: preco,
      quantidade: quantidade,
    }).then(res => {
      navigate("/produtos")
    }).catch(err => {
        if(!nome || !cor || !tamanho || !preco || !quantidade){
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
            <label className='h1Produtos'>Edição de produto</label>
            <div className='containerInputs01' style={{marginTop: 25}}>
                <label className='labelCadastroProduto'>Nome do produto</label>
                <input placeholder="Insira o nome" required value={nome} className="inputCadastroProduto inputGrande" onChange={(e) => setNome(e.target.value)} />
                <label className='labelCadastroProduto'>Cor</label>
                <input placeholder="Insira a cor" required value={cor} className="inputCadastroProduto inputGrande" onChange={(e) => setCor(e.target.value)}/>
            </div>
            <div className='containerInputs01'>
                <label className='labelCadastroProduto'>Tamanho</label>
                <input placeholder="00" required type="email" value={tamanho} className="inputCadastroProduto inputPequeno" onChange={(e) => setTamanho(e.target.value)}/>
                <label className='labelCadastroProduto'>Preço R$</label>
                <input placeholder="00.00" required type="number" value={preco} className="inputCadastroProduto inputPequeno removeSetaInput" onChange={(e) => setPreco(e.target.value)} />
                <label className='labelCadastroProduto'>Quantidade</label>
                <input placeholder="0" required type="number" value={quantidade} className="inputCadastroProduto inputPequeno" onChange={(e) => setQuantidade(e.target.value)} />
            </div>
            <div className='containerRowBtn'>
              { visibleBtn ? <button className="btnGreen btn" type='submit' style={{marginRight: 40}} onClick={updateProduto}>Editar</button> : ""}
              <button className='btnDelete' onClick={deleteProduto} >Excluir produto</button>
            </div>
            { erro ? <span className='spanErro'>{msgErro}</span> : ""}
            { spin ? <div class="spinner"></div> : ""}
        </div>
        </div>
        <Footer />
    </div>
  );
}

export default EditProduto;
