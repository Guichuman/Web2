
import React from 'react';
import { Link } from 'react-router-dom'
import './header.css';
import About from '../../view/about';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from "../../api/api"


function Header() {

    const navigate = useNavigate()


    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("email")
        navigate("/")
    }

    

    return (
        <div className='navBar'>
            <div className='containerLogoHeader'>
                <Link  to="/home">        
                    <img src="./logo_02.png" className="imgLogoHeader"  alt="logo"/>
                </Link>
            </div>
            <div className='containerLinksHeader'>
                <div className='containerLink'>
                    <Link className='linkHeader' to="/produtos">Produtos</Link>
                </div>
                <div className='containerLink'>
                    <Link className='linkHeader' to="/vendas">Vendas</Link>
                </div>
                <div className='containerLink'>
                    <Link className='linkHeader' to="/about">Sobre nós</Link>
                </div>
                <div className='containerLink'>
                    <Link className='linkHeader' to="/contato">Contato</Link>
                </div>
                <div className='containerLink'>
                    <Link className='linkHeader' to="/conta">Minha conta</Link>                    
                </div>
                <div className='containerLink'>
                    <Link className='linkHeader' onClick={logout} to="/">Sair</Link>                    
                </div>

            </div>
        </div>
    )
}

export default Header