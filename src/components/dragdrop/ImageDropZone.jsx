import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import styles from "./ImageDropZone.module.css";
import {Image} from 'cloudinary-react'
//import FormData from "form-data";
const ImageDropZone = (props)=>{
const [uploadedFiles, setUploadedFiles] = useState("");

    const onDrop = useCallback((acceptedFiles) => {
      const url =`https://api.cloudinary.com/v1_1/dxaezmu9i/upload`;

      acceptedFiles.forEach(async(acceptedFile) => {
         
        const formData = new FormData();
        formData.append("file", acceptedFile)
        formData.append('upload_preset', "shoppinglist")
        const data = await props.onImageDrop(url, formData);
        setUploadedFiles(data.public_id);

      });
    
      }, []);
      const {getRootProps, getInputProps, isDragActive} = useDropzone({
          onDrop,
          accepts: "image/*",
          multiple: false,
        });

      return (
          <>
          <div 
          {...getRootProps()} 
          className={`${styles.dropzone} ${isDragActive ? styles.active : null}`}>
              <input {...getInputProps()}/>
              Drop image here
              </div>
              <ul>
                  {console.log(uploadedFiles)}
                  <Image 
                      cloudName="dxaezmu9i" 
                      publicId={uploadedFiles} 
                      width="100" 
                      crop="scale"/>
             
              </ul>
          </>
         
      )
}
export default ImageDropZone;


