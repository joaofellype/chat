import React from 'react'

import  './style.css'

import PanelLeft from '../../componentes/login/leftPainel/index'
import SignupForm from '../../componentes/signup/form'

function singnup(){

    return(
        <div className="div-signup">
            <PanelLeft />
            <SignupForm />
        </div>
    )
}
export default singnup