import React,{ useState } from 'react'
import api from '../../../services/api'
import { useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css'
function FormLogin(){
    let history = useHistory()

        const [email,setEmail]=useState('')
        const [password,setPassword]=useState('')

        const handleChangeInputEmail=(event) =>{
                setEmail(event.target.value)
        }
        const handleChangeInputPassword=(event) =>{
                setPassword(event.target.value)
        }
         const  handleSubmit= async(event)=>{

            event.preventDefault();

             api.post('login',{email,password}).then(res=>{

                localStorage.setItem('token',res.data.token)
                 history.push('/home');

            }).catch(erro=>{
                toast.error(erro.response.data.message)

            })

         }
    return (
            <div id="div-form-login">
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
                <div className="div-text">
                    <h2>Login</h2>
                    <h4>Bem vindo de volta! Por favor faça seu <br/>login</h4>
                </div>     
                <div className="form-login">
                <form onSubmit={handleSubmit} >
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input 
                                onChange={handleChangeInputEmail}
                               type="email" 
                               name="email"
                               value={email}
                               id="email"/>
                    </div>
                    <div className="field">
                        <label htmlFor="password">Password</label>
                        <input 
                                onChange={handleChangeInputPassword}
                               type="password" 
                               name="password"
                               value={password
                            }
                               id="password"/>
                    </div>
                    <a href="/home">Esqueci a senha</a>
                    <br />
                     <button type="submit">Login</button>
                    </form>
                </div> 
                <br/>
                <div className="div-signup">
                  <span>Novo usuário? </span>
                  <a href="/signup"> Registra-se</a>   
                </div>

            </div>
    )
}

export default FormLogin