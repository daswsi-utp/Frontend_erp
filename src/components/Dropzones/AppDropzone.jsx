import React, { useState, useCallback } from "react"
import { useDropzone } from 'react-dropzone'
import { GeneralTooltip } from "@/components/shared/generalTooltip"
import { Button } from "../shared/button"


const AppDropzone = (props) => {
 const [files, setFiles] = useState([]);

 const onDrop = useCallback(acceptedFiles => {
  setFiles(
   acceptedFiles.map((item) => ({
    name: item.name,
    type: item.type,
   }))
  )
  props.setRealFiles(acceptedFiles)
 }, [setFiles])

 const {
  getRootProps,
  getInputProps,
  isDragActive,
  isDragAccept,
  isDragReject,
 } = useDropzone({
  onDrop,
  multiple: true,
  useFsAccessApi: false,
  accept: props.acceptParams
 });

 const setIcon = (_file) => {
  if (_file.type === 'text/csv') {
   return "https://raw.githubusercontent.com/jluisdeveloper/magna_images/main/CRM/icons/csv.png"
  } else if (_file.type === 'application/vnd.ms-excel' || _file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
   return "https://raw.githubusercontent.com/jluisdeveloper/magna_images/main/CRM/icons/xls.png"
  } else if (_file.type === 'application/vnd.ms-powerpoint' || _file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
   return "https://raw.githubusercontent.com/jluisdeveloper/magna_images/main/CRM/icons/ppt.png"
  } else if (_file.type === 'application/pdf') {
   return "https://raw.githubusercontent.com/jluisdeveloper/magna_images/main/CRM/icons/pdf.png"
  } else if (_file.type === 'application/zip') {
   return "https://raw.githubusercontent.com/jluisdeveloper/magna_images/main/CRM/icons/zip.png"
  } else if (_file.type === 'text/plain') {
   return "https://raw.githubusercontent.com/jluisdeveloper/magna_images/main/CRM/icons/txt.png"
  } else if (_file.type === 'application/msword' || _file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
   return "https://raw.githubusercontent.com/jluisdeveloper/magna_images/main/CRM/icons/doc.png"
  } else if (_file.type.includes('image')) {
   return "https://raw.githubusercontent.com/jluisdeveloper/magna_images/main/CRM/icons/img.png"
  } else {
   return "https://raw.githubusercontent.com/jluisdeveloper/magna_images/main/CRM/icons/def.png"
  }
 }

 const removeItem = (_index) => {
  const _files = [...files]
  const _realFiles = [...props.realFiles]
  _files.splice(_index, 1)
  _realFiles.splice(_index, 1)
  setFiles(_files)
  props.setRealFiles(_realFiles)
 }

 return (
  <div className="p-8 border-b border-gray-300 mb-5">
   <div
    {...getRootProps({
     className: `dropzone 
           ${isDragActive ? 'bg-gray-200' : 'bg-gray-100'} 
           ${isDragAccept ? 'border-green-500' : 'border-gray-300'} 
           ${isDragReject ? 'border-red-500' : 'border-gray-300'} 
           flex justify-center items-center cursor-pointer h-40 w-full border-2 border-dashed outline-none transition-all`
    })}
   >
    <input {...getInputProps()} />
    {isDragActive ? (
     <p className="text-gray-700">Suelta los archivos aquí ...</p>
    ) : (
     <p className="text-gray-700">Arrastra y suelta los archivos aquí, o haz click para seleccionar archivos</p>
    )}
   </div>

   <div className="mt-4 flex flex-wrap">
    {props.realFiles && props.realFiles.length && files.length ? files.map((file, index) =>
     <div className="p-4 bg-gray-100 rounded flex items-center justify-between mr-4 mb-4" key={index}>
      <GeneralTooltip
       content={file.name}
       triggerContent={
        <img
         width={70}
         src={setIcon(file)}
         alt={file.name}
         className="mr-3"
        />
       }
      />
      <GeneralTooltip content="Eliminar Archivo" triggerContent={
       <Button
        variant="destructive" // Usamos la variante destructiva para el botón de eliminar
        size="sm"
        leftSection={<span className="mr-2">🗑️</span>} // Añadimos un ícono de basura al lado izquierdo
        className="mt-2"
        onClick={() => removeItem(index)}
       >
        Eliminar
       </Button>
      } />
     </div>
    ) : null}
   </div>
  </div>
 )
}

export default AppDropzone