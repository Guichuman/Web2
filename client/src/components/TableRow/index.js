import React from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import api from "../../api/api"


function TableRow(props) {

    const navigate = useNavigate()
    const mandaParam = () => {
        navigate("/editProduto", {
            state: {
                produto: props
            }
        })
    }

    const bgColor = {
        "edit": "#f4c419",
        "delete": "#F2201D"
    }

    return (
        <tr>
             <th>{props.id}</th>
             <th>{props.nome}</th>
             <th>{props.tamanho}</th>
             <th>{props.cor}</th>
             <th>R$ {props.preco}</th>
             <th style={{width: 140}}>{props.quantidade}</th>
             <th style={{width: 140}}>
                <button className="btnAcoesLink" style={{backgroundColor: bgColor.edit}} onClick={mandaParam}>Editar</button>
            </th>
        </tr>
    )
}

export default TableRow