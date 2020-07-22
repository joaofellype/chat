import React from 'react'
import PanelLeft from '../../componentes/login/leftPainel/index'
import FormLogin from '../../componentes/login/form/index'
import './style.css'
function Login(){

    return(
        <div className="div-login">
            <PanelLeft />
            <FormLogin/>
        </div>
    )
}

export default Login