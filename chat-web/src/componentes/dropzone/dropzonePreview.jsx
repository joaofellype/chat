import React, {useEffect, useState, useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import { FiUpload } from 'react-icons/fi'

import './style.css'


function Previews(props) {
    const [selectedFileUrl, setSelectedFileUrl] = useState('')
    const [files, setFiles] = useState([]);

    const onDrop = useCallback(acceptedFiles => {

      const file = acceptedFiles[0]
      
      const fileUrl = URL.createObjectURL(file);
      setSelectedFileUrl(fileUrl)
      props.onFileUploaded(file)
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
  }, [props.onFileUploaded])
    const {getRootProps, getInputProps} = useDropzone({
      accept: 'image/*',
      onDrop
    });
    
    const thumbs = files.map(file => (
      <div  className="div-preview-image"  key={file.name}>
        <div >
          <img
            src={file.preview}
          />
        </div>
      </div>
    ));
  
    useEffect(() => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);
  
    return (
      <section className="container">
        <div className="div-preview-image" {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />

                    <p>
                        <FiUpload />
                        Imagem para enviar</p>
                
        </div>
        <aside >
          {thumbs}
        </aside>
      </section>
    );
  }
  

export default Previews