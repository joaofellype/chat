import React,{useEffect} from 'react' 
import './style.css'
import fotoRedonda from '../../utils/rosto-redondo.png'
import chat from '../../utils/comment.png'
import videoCall from '../../utils/film.png'

function Aside (props){

    useEffect(()=>{
    },[props.dataDestinatario])

    return(
        <div className="div-aside">
                <div className="div-aside-perfil">
                    <img src={props.dataDestinatario.image_user == null ? fotoRedonda : props.dataDestinatario.image_user } alt="photo-pefil" />
                    <ul>
                        <li>{props.dataDestinatario.name_user}</li>
                        <li>{props.dataDestinatario.number_user}</li>
                    </ul>
                </div>
                <div className="div-aside-call" >
                <div>
                     <img src={chat} alt="chat-pefil" />
                     <p>Chat</p>
                </div>
                <div>
                     <img src={videoCall} alt="video-pefil" />
                     <p>Video Call</p>
                </div>
             
                    

                </div>
        </div>
    )
}
export default Aside