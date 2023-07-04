import './editPassword.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react';
import api from "../../api/api"
import { useNavigate, Link } from 'react-router-dom';



function VerificaPassword() {

    let userEmail = localStorage.getItem("email")
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const [erro, setErro] = useState(false)
    const [msgErro, setMsgErro] = useState()



    const verificarSenha  = async () => {

        api.post("/users/"+userEmail, {
            password: password,
            email: userEmail
        }).then(res => {
            navigate("/editPassword")
        }).catch(err => {
            setErro(true)
            setMsgErro("Senha não correspondente")
            console.log(err)
        })
    }



  
    return (
        <div>
        <Header />
            <div className='containerContato'>
                <h1 className='h1Contato'>Insira sua senha atual</h1>
                <div className='conatinerInputConta'>
                    <label className='labelConta'>Senha</label>
                    <input className='inputConta' placeholder='*******'  type="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                { erro ? <span className='spanErro'>{msgErro}</span> : ""}
                <div className='conatinerInputConta' style={{justifyContent: "space-between", padding: 10}}>
                    <button className='btnCadastroUser btn' onClick={verificarSenha}>Enviar senha</button>
                </div>
                
            </div>
        <Footer />
        </div>
    );
}

export default VerificaPassword;
