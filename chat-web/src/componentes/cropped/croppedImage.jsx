import React,{useState} from 'react'
import AvatarEditor from 'react-avatar-editor';



const ImageCrop = ({ imageSrc, onCrop, setEditorRef,scaleValue, onScaleChange})=>(

    <div className="div-editor-image" >
        <AvatarEditor  image={imageSrc} border={50} scale={scaleValue} ref={setEditorRef} /> 
        <input style={{width:'50%'}} type='range' value={scaleValue} min="1" max="10" onChange={onScaleChange} />

        <button  onClick={onCrop}>Cortar</button>
    </div>

);

export default ImageCrop;

