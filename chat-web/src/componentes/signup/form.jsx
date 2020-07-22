import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api'
import { useHistory } from 'react-router-dom'
import './style.css'

const FormSignup = (props) => {
    const [redirect,setRedirect] = useState(false)
    let history = useHistory()

 
    const [formData, setFormData] = useState({
        name_user: '',
        email_user: '',
        number_user: '',
        password_user: ''

    });
    useEffect(()=>{
        if (redirect) {
           history.push('/login');

          }
    },[redirect])

    const handleSubmit = async (event) => {

        event.preventDefault()


        await api.post('users', formData).then(res=>{
            toast.success('Cadastrado com sucesso!')
            setFormData({
                name_user: '',
                email_user: '',
                number_user: '',
                password_user: ''
            })
            setRedirect(true)
        })

        

    }
    const handleChangeInput = (event) => {

        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value })
    }
    return (

        <div id="div-form-signup">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <ToastContainer />
            <div className="div-text-signup">
                <h2>Registra-se</h2>
                <h4>Bem vindo! Faça seu Cadastro</h4>
            </div>
            <div className="form-signup">

                <form onSubmit={handleSubmit} >
                    <div className="field">
                        <label htmlFor="name">Nome</label>
                        <input
                            type="text"
                            name="name_user"
                            value={formData.name_user}
                            onChange={handleChangeInput}
                            id="name" />
                    </div>
                    <div className="field">
                        <label htmlFor="number">Número</label>
                        <input
                            type="text"
                            value={formData.number_user}
                            name="number_user"
                            onChange={handleChangeInput}
                            id="number" />
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email_user"
                            value={formData.email_user}
                            onChange={handleChangeInput}
                            id="email" />
                    </div>
                    <div className="field">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password_user"
                            value={formData.password_user}
                            onChange={handleChangeInput}
                            id="password" />
                    </div>
                    <br />
                    <button type="submit">Cadastre-se</button>
                </form>

            </div>
            <br />
            <div className="div-signup-footer">
                <span>Já é usuário? </span>
                <a href="/login">Login  </a>
            </div>

        </div>
    )
}

export default FormSignup