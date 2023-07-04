import './login.css';
import { Link } from 'react-router-dom'
import Home from '../home';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import api from "../../api/api"
import { setAuthToken } from '../../api/setAuthToken';
import axios from 'axios';


function Login() {


  let navigate = useNavigate()

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [erro, setErro] = useState(false)
  const [spin, setSpin] = useState(false)
  const [visibleBtn, setVisibleBtn] = useState(true)


  const autenticar  = async () => {
    api.post("/auth", {
      email: email,
      password: password,
    }).then(res => {
      localStorage.setItem("token", res.data.token) 
      localStorage.setItem("email", email) 
      setAuthToken(res.data.token)
      navigate("/home")
    }).catch(err => {
        setErro("Não foi possível logar, verifique seus dados")
        console.log(err)
    }).finally(() => {
      setSpin(false)
      setVisibleBtn(true)
    })
  }
  
  return (
    <div className="containerLogin">
      <div  className="containerDescricao">
        <img src="./logo_02.png" className="imgLogo" style={{marginTop: 40}} alt="logo"/>
        <div className="descricao">
          <p style={{fontSize: 30}} className="paragrafoDescricao">Sistema de controle e estoque de produtos</p>
        </div>
      </div>
      <div  className="containerFormLogin">
        <h1 className="h1Login">Login</h1>
        <form>
          <div className="formLogin">
            <input placeholder="email@email.com" required type='email' className="inputLogin" onChange={(e) => setEmail(e.target.value)}/>
            <input placeholder="***************" required type="password" className="inputLogin" onChange={(e) => setPassword(e.target.value)}/>
            { erro ? <span className='spanErro'>Dados incorretos</span> : ""}
            { spin ? <div class="spinner"></div> : ""}
            { visibleBtn ? <Link className="btnEntrar btn" style={{marginTop: 25}} onClick={autenticar}>Entrar</Link> : ""}
          </div>
        </form>
          <Link to="/user" className="btnCadastrar btn" style={{marginTop: 30}}>Criar conta</Link>
          <div style={{marginLeft: 15, marginRight: 15}}></div>
      </div>
    </div>
  );
}

export default Login;
