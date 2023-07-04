import './cadastroProduto.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import api from "../../api/api"
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function CadastroProduto() {

  let navigate = useNavigate()
  const [nome, setNome] = useState()
  const [cor, setCor] = useState()
  const [tamanho, setTamanho] = useState()
  const [preco, setPreco] = useState()
  const [quantidade, setQuantidade] = useState()
  const [erro, setErro] = useState()
  const [msgErro, setMsgErro] = useState()
  const [spin, setSpin] = useState(false)
  const [visibleBtn, setVisibleBtn] = useState(true)

   const create  = async () => {

    setSpin(true)
    setVisibleBtn(false)

    if(nome == "" || cor == "" || tamanho == "" || preco == "" || quantidade == ""){
      setErro(true)
      setMsgErro("Preencha todos os campos")
    }else{
      api.post("/produtos", {
        nome: nome,
        cor: cor,
        tamanho: tamanho,
        preco: preco,
        quantidade: quantidade,
      }).then(res => {
        navigate("/produtos")
      }).catch(err => {
        setErro(true)
        setMsgErro("Dados incorretos, verifique os campos")
        console.log(err)
      })
    }

    setSpin(false)
    setVisibleBtn(true)
  }

  return (
    <div>
        <Header />
        <div className="containerCadastroUser">
        <div className="formCadastroProduto">
            <label className='h1Produtos'>Cadastro de produto</label>
            <div className='containerInputs01' style={{marginTop: 25}}>
                <label className='labelCadastroProduto'>Nome do produto</label>
                <input placeholder="Insira o nome" required  className="inputCadastroProduto inputGrande" onChange={(e) => setNome(e.target.value)} />
                <label className='labelCadastroProduto'>Cor</label>
                <input placeholder="Insira a cor" required className="inputCadastroProduto inputGrande" onChange={(e) => setCor(e.target.value)}/>
            </div>
            <div className='containerInputs01'>
                <label className='labelCadastroProduto'>Tamanho</label>
                <input placeholder="00" required type="email" className="inputCadastroProduto inputPequeno" onChange={(e) => setTamanho(e.target.value)}/>
                <label className='labelCadastroProduto'>Preço R$</label>
                <input placeholder="00.00" required type="number" className="inputCadastroProduto inputPequeno removeSetaInput" onChange={(e) => setPreco(e.target.value)} />
                <label className='labelCadastroProduto'>Quantidade</label>
                <input placeholder="0" required type="number" className="inputCadastroProduto inputPequeno" onChange={(e) => setQuantidade(e.target.value)} />
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

export default CadastroProduto;
