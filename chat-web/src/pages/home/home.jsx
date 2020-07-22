import React, { useEffect, useState } from 'react';
import Sidebar from '../../componentes/sidebar/index'
import Section from '../../componentes/section/index'
import Aside from '../../componentes/aside/index'
import api from '../../services/api'
import { useHistory } from 'react-router-dom'
import './style.css';


function Home() {
  let history = useHistory()
    const [dataUser,setDataUser] = useState({})
    const [dataDestinatario,setdataDestinatario] = useState({})
    const [dataIdChat,setIdDataChat] = useState(null)
    const [dataConfirmDestinatario,setDataConfirmDestinatario] = useState({})
  useEffect(() => {
    async function handlenext() {
      const token = localStorage.getItem('token')
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }
      // if(!token){
      //     return false
      // }

      api.get('autenticUser', config).then(res =>{
         setDataUser(res.data.data)
      }).catch(error=>{
        if(error.response.data.message==false){
          localStorage.removeItem('token')
          return history.push('/login');
        }
      })
      // if (autentic.data.message === false) {
      // }
    }
    handlenext()
  }, [])

  return (
    <div id="div-home">
      <div className="content">
        <Sidebar dataIdChat={setIdDataChat} dataConfirmDestinatario={dataConfirmDestinatario} dataUser={setdataDestinatario} />
        <Section  idChat={dataIdChat} dataConfirmDestinatio={setDataConfirmDestinatario} dataUser={dataUser} dataDestinatario={dataDestinatario}/>
        <Aside dataDestinatario={dataDestinatario}  />
      </div>
    </div>
  );
}

export default Home;
