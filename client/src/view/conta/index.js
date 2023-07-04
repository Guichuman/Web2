import './conta.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react';
import api from "../../api/api"
import { useNavigate, Link } from 'react-router-dom';



function Conta(props) {

  const [nome, setNome] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  let userEmail = localStorage.getItem("email")
  const [erro, setErro] = useState()
  const [msgErro, setMsgErro] = useState()

  useEffect(() => {
    api.get("/users/"+userEmail)
        .then((res) => {
          setNome(res.data.nome)
          setEmail(res.data.email)
    })
    .catch((erro) => {
      console.log("erro " + erro)
    })
  },[])

  const deleteConta = async () => {
    if(window.confirm("Deseja excluir sua conta?")){
      api.delete("/users/"+userEmail)
      .then(res => {
          navigate("/")
      }).catch(err => {
          console.log(err)
      })
    }
  }

  const updateConta  = async () => {


    api.put("/users/"+userEmail, {
      nome: nome,
      email: email
    }).then(res => {
      localStorage.setItem("email", email)
      navigate("/home")
    }).catch(err => {
        if(!nome || !email){
            setErro(true)
            setMsgErro("Preencha todos os campos")
        }else{
            setErro(true)
            setMsgErro("Dados incorretos, verifique os campos")
        }

        console.log(err)
    })
  }



  
  return (
    <div>
      <Header />
        <div className='containerContato'>
            <h1 className='h1Contato'>Minha conta</h1>
            <div className='conatinerInputConta'>
                <label className='labelConta'>Nome</label>
                <input className='inputConta' placeholder='Nome' value={nome} onChange={(e) => setNome(e.target.value)}/>
            </div>
            <div className="conatinerInputConta" >
                <label className='labelConta' >Email</label>
                <input className='inputConta' placeholder='Email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />    
            </div>
            { erro ? <span className='spanErro'>{msgErro}</span> : ""}
            <div className='conatinerInputConta' style={{justifyContent: "space-between", padding: 10}}>
                <button className='btnCadastroUser btn' style={{marginRight: 20}} onClick={updateConta}>Editar dados</button>
                <Link className='btnEditPassword btn' style={{marginTop: 40}} to="/verificaPassword" >Trocar senha</Link>
                <button className='btnDeleteConta btn' style={{marginTop: 40, marginLeft: 20}} onClick={deleteConta}>Excluir conta</button>
            </div>
            
        </div>
      <Footer />
    </div>
  );
}

export default Conta;
