import React from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './modalDelete.css';



function ModalDelete(props) {

   
    return (
        <div className='containerModal'>
            <div className='modal'>
                <h2 style={{marginTop: 35}}>Deseja excluir esse item?</h2>
                <div className='containerBtnModal'>
                    <button className='btnModal' onClick={deleteProduto} style={{marginRight: 40, backgroundColor: "#F2201D"}}>Sim</button>
                    <button className='btnModal' onClick={closeModal}>Cancelar</button>
                </div>
            </div>

        </div>
    )
}

export default ModalDelete