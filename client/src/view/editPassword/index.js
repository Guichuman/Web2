import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react';
import api from "../../api/api"
import { useNavigate, Link } from 'react-router-dom';



function EditPassword() {

    let userEmail = localStorage.getItem("email")
    const [password, setPassword] = useState()
    const [repetirPassword, setRepetirPassword] = useState()
    const navigate = useNavigate()
    const [erro, setErro] = useState(false)
    const [msgErro, setMsgErro] = useState()



    const updateSenha  = async () => {
        if(password == repetirPassword){
            if(password !== "" || repetirPassword !== ""){
                api.post("/password/"+userEmail, {
                    password: password,
                    email: userEmail
                }).then(res => {
                    navigate("/conta")
                }).catch(err => {
                    setErro(true)
                    setMsgErro("Dados incorretos")
                    console.log(err)
                })
            }else{
                setErro(true)
                setMsgErro("Preencha todos os campos")
            }
        }else{
            setErro(true)
            setMsgErro("Senhas não correspondem")
        }
    }



  
    return (
        <div>
        <Header />
            <div className='containerContato'>
                <h1 className='h1Contato'>Nova senha</h1>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 50}}>
                        <label className='labelConta'>Senha</label>
                        <input className='inputConta' placeholder='*******'  type="password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row'}}>
                        <label className='labelConta'>Repetir Senha</label>
                        <input className='inputConta' placeholder='*******' style={{marginRight: 65}} type="password" onChange={(e) => setRepetirPassword(e.target.value)}/>
                    </div>
                </div>
                { erro ? <span className='spanErro'>{msgErro}</span> : ""}
                <div className='conatinerInputConta' style={{justifyContent: "space-between", padding: 10}}>
                    <button className='btnCadastroUser btn' onClick={updateSenha}>Alterar senha</button>
                </div>
                
            </div>
        <Footer />
        </div>
    );
}

export default EditPassword;
