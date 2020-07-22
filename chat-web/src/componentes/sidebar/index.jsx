import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button, Form } from 'react-bootstrap'
import api from '../../services/api'
import fotoRedonda from '../../utils/rosto-redondo.png'
import CropImage from '../cropped/croppedImage'
import DropZone from '../dropzone/dropzonePreview'
import { FiUserPlus, FiEdit2 } from 'react-icons/fi'
// import 'bootstrap/dist/css/bootstrap.min.css';

import './style.css'
function Sidebar(props) {

    const [users, setUsers] = useState([])
    const [user, setUser] = useState({});
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [show, setShow] = useState(false);
    const [showSearchUser, setShowSear] = useState(false);
    const [showEditImage, setEditImage] = useState(false);
    const [nameSearch,setNameSearch] = useState('')
    const [usersSearch,setUsersSearchs] = useState([])
    const [image,setImage] = useState('')
    const [crop, setCrop] = useState({ aspect: 16 / 9 });
    const [userProfilePic,setUserProfilePic] = useState('')
    const [edit,setEdit] = useState(null)
    const [editor, setEditor] = useState(null)
    const [scaleValue,setScaleValue] = useState(1)
    const [selectedImage,setSelectedImage] = useState(null)



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseEditImage = () => setEditImage(false);
    const handleShowEditImage = () => setEditImage(true);
 
    const handleCloseSearch = () => setShowSear(false);
    const handleShowSearch = () => setShowSear(true);
    const  setEditorRef = editor =>setEditor(editor)
  
    useEffect(() => {
        
        async function listChats() {

            const token = localStorage.getItem('token')
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }


            const response = await api.get('autenticUser', config)
            const id = response.data.data.id
            setUser(response.data.data)
            setName(response.data.data.name_user)
            setNumber(response.data.data.number_user)
            const chats = await api.get(`chat/${id}`)
            let oi = []
            chats.data.op.map(function (chat) {
                chats.data.conversas.map(function (messaga) {
                    
                    if (chat.userID === messaga.id_user || chat.userID === messaga.id_user2) {
                        oi.push({ id: chat.userID, name_user: chat.name_user,number_user:chat.number_user, image: chat.image_user, body_message: messaga.body_message,idChat:messaga.id_chat })
                    }

                })
            })
            setUsers(oi)

        }


        listChats()
        console.log(user)
    }, [])
    useEffect(()=>{

        users.map(user =>{
            if(user.id !== props.dataConfirmDestinatario.id){
                setUsers([...users,props.dataConfirmDestinatario])

            }
        })
    },[props.dataConfirmDestinatario])
    const handleSubmit = async (event) => {
        event.preventDefault()
        const response = await api.get(`searchUsers?name=${nameSearch
        }`);

        setUsersSearchs(response.data)
    }
    const handleUpdateUser = async (event) =>{
        event.preventDefault()
      
       const data ={
           image_user:user.image_user,
           name_user: name,
           image_user:user.image_user,
           number_user:number,
           email_user:user.email_user
       }
      const response =await api.put(`updateUser/${user.id}`,data)
       setUser(response.data.result[0])
       toast.success(response.data.message)
       setShow(false)
    }
    const handleChangeName = (event)=>{

        setName(event.target.value)
    }
    const handleChangeNumber = (event)=>{

        setNumber(event.target.value)
    }
    const handleChangeNameSearch = (event)=>{

        setNameSearch(event.target.value)
    }
    const detailsChat = async (user1) =>{

        
            props.dataUser(user1)
            setUsersSearchs([])
            setNameSearch('')
            setShowSear(false)
        
       
    }
    const details = (event) =>{
        console.log(event.idChat)
        props.dataIdChat(event.idChat)
        props.dataUser(event)

    }

    const handleInputImage =  async (event) =>{



        
        
        let files = event.target.files;
        
          const data = new FormData();
          data.append('image',files[0])
          
             await api.post('image',data);
        
}   

    const profileImageChange = (fileChangeEvent) => {

            const file = fileChangeEvent.target.files[0];

            const {type} = file;
            if(type.endsWith('jpeg') || type.endsWith('png') || type.endsWith('jpg')){

                setSelectedImage(file)
            }


    }


    const onCrop = async () =>{
            if(editor != null){
                   
                const url = editor.getImageScaledToCanvas().toDataURL();
                console.log(editor)
                
                   const data = new FormData();
                data.append('image',editor.props.image)

                  const response =   await api.post('image',data); 
                    let data_user = user;

                    data_user.image_user=response.data.message;
                    
                 const responseUpdate =  await api.put(`updateUser/${user.id}`,data_user);
                 console.log(responseUpdate.data)
                  toast.success('Foto atualizada com sucesso')

                setSelectedImage(null)
                setUser(responseUpdate.data.result[0])
                setUserProfilePic(url)
                setEditImage(false)
            }
    }

    const onScaleChange = (scaleValueEvent) => {
        const scaleValue1 = parseFloat(scaleValueEvent.target.value);
        setScaleValue(scaleValue1)
    }
    return (
        <div className="sidebar">
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
            <div className="div-perfil" >

                <div className="div-image-perfil">
                   <img onClick={handleShowEditImage} src={user.image_user == null ? fotoRedonda:user.image_user
                } />
                    {/* <form >
                        <input type="file" onChange={(event)=>handleInputImage(event)} name="" id=""/>
                    </form> */}
                </div>
                <div className="div-data-pefil">
                    <label>{user.name_user}</label>
                    <label>{user.number_user}</label>
                </div>
                <div className="div-editar-perfil">
                    <button onClick={handleShowSearch} type="button"><FiUserPlus color="#656565" size={18} /></button>
                    <button onClick={handleShow} type="button">< FiEdit2 color="#656565" size={18} /></button>

                </div>

            </div>
            {/* <div className="div-search-friends">
                <div className="form-search-friends">
                    <form onSubmit={handleSubmit}>
                        <input type="text" onChange={handleInputSearch} placeholder="Search friends" id="search-friend" name="search-friend" />
                    </form>
                </div>
            </div> */}
            <div className="div-list-friends" >

                {users.map(user => (


                    <div className="item-list-friends"  onClick={() =>details(user)}  key={user.idChat}>
                        <div className="item-photo">
                            <img src={user.image_user == null ? fotoRedonda : user.image_user} alt="perfil-friend" />
                        </div>
                        <div className="item-data">
                            <h5>{user.name_user}</h5>

                            <label >{user.body_message}</label>
                        </div>
                        <div className="item-time">
                            <label>10:15 PM</label>
                        </div>
                    </div>

                ))}


            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Usuário</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdateUser}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control  onChange={handleChangeName} value={name} type="text" placeholder="Nome" />
 
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Número</Form.Label>
                            <Form.Control onChange={handleChangeNumber} value={number} type="text" placeholder="Number" />
                        </Form.Group>
                     
                        <Button variant="primary" type="submit">
                            Atualizar
                     </Button>
                    </Form>
                </Modal.Body>
                
            </Modal>

            <Modal show={showSearchUser} onHide={handleCloseSearch}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div id="div-search-fried" className="form-search-friends">
                    <form onSubmit={handleSubmit}>
                        <input type="text" onChange={handleChangeNameSearch} value={nameSearch} placeholder="Search friends" id="search-friend" name="search-friend" />
                    </form>
                </div>
                <br/>
                        {
                            usersSearch.map(user1=>(
                                <div onClick={() =>detailsChat(user1)}  className="item-list-friends"  key={user1.id}>
                                <div className="item-photo">
                                    <img src={fotoRedonda} alt="perfil-friend" />
                                </div>
                                <div className="item-data">
                                    <h5>{user1.name_user}</h5>
        
                                     <h6 >{user1.number_user}</h6>
                                </div>
                               
                            </div>
                            ))
                        }
                    
                </Modal.Body>
                
            </Modal>
            <Modal show={showEditImage} onHide={handleCloseEditImage}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Foto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="div-editor-image1">
                    <img src={userProfilePic} />

                        <input type="file"  accept="image/png, image/jpg " onChange={profileImageChange} />
                        {
                            selectedImage != null ?
                             
                                <CropImage 
                                imageSrc={selectedImage}
                                setEditorRef={setEditorRef}
                                onCrop={onCrop}
                                scaleValue={scaleValue}
                                onScaleChange={onScaleChange}
                                />
                                :
                                <p> </p>
                        }
                      

                    </div>

                    
                </Modal.Body>
                
            </Modal>
           

        </div>
    );
}

export default Sidebar;
