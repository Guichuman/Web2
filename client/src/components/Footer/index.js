import React from 'react';
import { Link } from 'react-router-dom'
import './footer.css';
import {FiInstagram} from 'react-icons/fi'



function Footer() {
    return (
        <footer className='footer'>
            <div className='containerLinkFooter'>
                <Link className='linkFooter' to="https://www.instagram.com/spinyskateshop/">
                    <FiInstagram className='instaIcon' />
                </Link>
                <Link className='linkFooter' to="https://www.spiny.com.br/">
                    <div style={{marginLeft: 20}}>
                        Nosso site
                    </div>
                </Link>
            </div>
            <div className='linkFooter'>
                <div style={{marginRight: 20}}>
                    @Copyright Todos os direitos reservados
                </div>
            </div>
        </footer>
    )
}

export default Footer