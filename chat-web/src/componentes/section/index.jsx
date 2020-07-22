import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'
import { Modal, Button, Form } from 'react-bootstrap'
import DropZone from '../dropzone/dropzonePreview'

import './style.css'
import fotoRedonda from '../../utils/rosto-redondo.png'
import search from '../../utils/procurar.svg';
import notificacao from '../../utils/notificacao.svg'
import coracao from '../../utils/coracao.svg'
import microphone from '../../utils/microphone (1).png';
import clip from '../../utils/attach.svg';
import camera from '../../utils/camera (1).png';
import { FiSearch, FiBell, FiHeart, FiCamera, FiPaperclip, FiMic } from 'react-icons/fi'
import api from '../../services/api'

const myId = uuidv4()
const socket = io('http://localhost:3333');

socket.on('connect', () => console.log(`[IO] CONECTADO `))
function Section(props) {

        const [message, setMessage] = useState('')
        const [messages, setMessages] = useState([])
        const [idChat, setIdChat] = useState(null)
        const [dataDestinatario, setdataDestinatario] = useState({})
        const [dataUser, setDataUser] = useState({})
        const [showSendImage, setSendImage] = useState(false);
        const [selectedFile, setSelectedFile] = useState(null)
        const [idUpload, setUpload] = useState(null);

        const handleCloseSendImage = () => setSendImage(false);
        const handleShowSendImage = () => setSendImage(true);
        useEffect(() => {
         
                setdataDestinatario(props.dataDestinatario)
              
        }, [props.dataDestinatario])
        useEffect(() => {
            
                setDataUser(props.dataUser)
        }, [props.dataUser])
        useEffect(() => {
            
                setIdChat(props.idChat)
        }, [props.idChat])
   
        useEffect(() => {
                const handleNewMessage = (newMessage) => {
                        console.log(newMessage)
                        const data = {
                                id: newMessage.id,
                                body_message: newMessage.message
                        }
                        setMessages([...messages, data])

                }



                socket.on('enviar mensagem', handleNewMessage)
                return () => socket.off('enviar mensagem', handleNewMessage)

        }, [messages])
        useEffect(() => {
                async function showMessage() {
                        if (idChat !== null) {
                                const response = await api.get(`message/${idChat}`);
                                console.log(response.data)
                                setMessages(response.data)
                        }

                }
                showMessage()
        }, [idChat])
        const handleInputChange = (event) => {

                setMessage(event.target.value)
        }
        const handleFormSubmit = async (event) => {
                event.preventDefault();
                const urlImagem ='';
              
                const user = {
                        name_user: dataDestinatario.name_user,
                        id: dataDestinatario.id,
                        email_user: dataDestinatario.email_user,
                        number_user: dataDestinatario.number_user,
                        body_message: message
                }
                props.dataConfirmDestinatio(user)
                if (idChat == null) {
                        if (selectedFile == null) {

                            const data = {
                                        body_message: message,
                                        id_user: dataUser.id,
                                        id_user2: dataDestinatario.id,
                                        type_message: 'text',
                                        id_upload: null
                                }
                                console.log(data)
                                const response = await api.post('message', data)
                                setIdChat(response.data.idChat)

                        }else{
                        
                        const dataImage = new FormData();

                        dataImage.append('image',selectedFile)
                        const responseImage = await api.post('imageMessage',dataImage);
                               
                            const data = {
                                body_message: message,
                                id_user: dataUser.id,
                                id_user2: dataDestinatario.id,
                                type_message: 'media',
                                id_upload: null,
                                path_image: responseImage.data.message
                        }
                        const response = await api.post('message', data)
                        setIdChat(response.data.idChat)   
                        setSelectedFile(null)
                        }

                } else {

                        if (selectedFile == null) {

                        const data = {
                                body_message: message,
                                id_user: dataUser.id,
                                id_user2: dataDestinatario.id,
                                type_message: 'text',
                                id_chat: idChat,
                                id_upload: null
                        }
                        const response = await api.post('message', data)
                }else{

                        const dataImage = new FormData();

                        dataImage.append('image',selectedFile)
                        const responseImage = await api.post('imageMessage',dataImage) 
                        console.log(responseImage.data.message)
                            const data = {
                                body_message: message,
                                id_user: dataUser.id,
                                id_user2: dataDestinatario.id,
                                type_message: 'media',
                                id_chat: idChat,
                                path_image: responseImage.data.message
                        }
                        console.log('dfdfdfdf')
                        const response = await api.post('message', data)
                        setSelectedFile(null)
                }
                

                }


                if (message.trim()) {
                        socket.emit('enviar mensagem', {
                                id: dataUser.id,
                                message
                        })

                        setMessage('')
                }
                setSendImage(false)
        }
        
        return (

                <div className="div-section">
                        <div className="div-section-status">
                                <div className="item-section-perfil">
                                        <img src={fotoRedonda} alt="photo" />
                                        <h5>{props.dataDestinatario.name_user}</h5>
                                        <label className="status-off"></label>
                                </div>
                                <div className="item-section-icons">
                                        <FiSearch style={{ padding: 6 }} size={25} />
                                        <FiBell style={{ padding: 6 }} size={25} />
                                        <FiHeart style={{ padding: 6 }} size={25} />
                                </div>

                        </div>

                        <br />
                        <hr id="linha" />

                        <div className="div-space-chat">
                                <ul className="list">
                                        {messages.map((m, index) => (
                                                <li key={index} className={`list__item list__item--${m.id === dataUser.id ? 'mine' : 'other'}`}>
                                                        <br />
                                                        
                                                        {m.type_message != "media" ? <span className={`message message--${m.id === dataUser.id ? 'mine' : 'other'}`}>{m.body_message}</span> : <img src={m.path_image} />}
                                                </li>
                                        ))}

                                </ul>
                        </div>

                        <div className="div-form-send-message">
                                <div className="div-form">
                                        <form onSubmit={handleFormSubmit}>
                                                <button type="button"><FiMic size={18} color="gray" /></button>
                                                <input value={message} onChange={handleInputChange} placeholder="Escreva a mensagem aqui" type="text" name="message" id="" />
                                                <button onClick={handleShowSendImage} type="button"><FiPaperclip size={18} color="gray" /></button>

                                                <button type="button"><FiCamera size={18} color="gray" /></button>
                                                <input value="" id="enviar" type="submit" />

                                        </form>
                                </div>

                        </div>


                        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" show={showSendImage} onHide={handleCloseSendImage}>
                                <Modal.Header closeButton>
                                        <Modal.Title>Enviar Imagem</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                        <div>
                                                <form onSubmit={handleFormSubmit} className="div-form-send-image">
                                                        <DropZone onFileUploaded={setSelectedFile} />
                                                        <button type="submit" >Enviar</button>
                                                </form>
                                        </div>

                                </Modal.Body>

                        </Modal>

                </div>
        )

}

export default Section