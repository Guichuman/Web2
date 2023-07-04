import React from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'



function TableRowVendas(props) {

    const navigate = useNavigate()
    const mandaParam = () => {
        navigate("/editVenda", {
            state: {
                venda: props
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
             <th>{props.produtoId}</th>
             <th>{props.desconto}%</th>
             <th>R$ {props.preco_final}</th>
             <th><button className="btnAcoesLink" style={{backgroundColor: bgColor.edit}} onClick={mandaParam}>Editar</button></th>
        </tr>
    )
}

export default TableRowVendas