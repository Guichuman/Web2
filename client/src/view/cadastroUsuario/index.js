import './cadastroUsuario.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import api from "../../api/api"

function CadastroUsuario() {

  let navigate = useNavigate()
  const [nome, setNome] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [repeatPassword, setRepeatPassword] = useState()
  const [erro, setErro] = useState()
  const [spin, setSpin] = useState(false)
  const [visibleBtn, setVisibleBtn] = useState(true)

   const create  = async () => {

    setSpin(true)
    setVisibleBtn(false)

    if(nome == "" || email == "" || password == ""){
      setErro("Todos os campos devem estar preenchidos")
    }else{
      api.post("/users", {
        nome: nome,
        email: email,
        password: password,
      }).then(res => {
        navigate("/")
      }).catch(err => {
          setErro("Não foi possível cadastrar, verifique seus dados")
          console.log(err)
      })
    }
    setSpin(false)
    setVisibleBtn(true)

  }

  return (
    <div className="containerCadastroUser">
      <div className="formCadastoUser">
        <label className='tituloForm'>Faça seu cadastro</label>
        <label className='labelCadastroUser'>Nome</label>
        <input placeholder="Insira seu nome" required  className="inputCadastroUser" onChange={(e) => setNome(e.target.value)} />
        <label className='labelCadastroUser'>Email</label>
        <input placeholder="email@email.com" required type="email" className="inputCadastroUser" onChange={(e) => setEmail(e.target.value)}/>
        <label className='labelCadastroUser'>Senha</label>
        <input placeholder="************" required type="password" className="inputCadastroUser" onChange={(e) => setPassword(e.target.value)}/>
        { erro ? <span className='spanErro'>{erro}</span> : ""}
        { spin ? <div class="spinner"></div> : ""}
        { visibleBtn ? <button className="btnCadastroUser btn" type='submit' onClick={create}>Cadastrar</button> : ""}
      </div>
    </div>
  );
}

export default CadastroUsuario;
