import React, { useState, useCallback } from "react"
import { useDropzone } from 'react-dropzone'
import { Button } from "../shared/button"
import GeneralTooltip from "@/components/shared/generalTooltip" 

const AppDropzone = (props) => {
  const [files, setFiles] = useState([])

  const onDrop = useCallback(acceptedFiles => {
    setFiles(
      acceptedFiles.map((item) => ({
        name: item.name,
        type: item.type,
      }))
    )
    props.setRealFiles(acceptedFiles)
  }, [setFiles, props.setRealFiles])

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
    accept: props.acceptParams,
  })

  const setIcon = (_file) => {
    const iconMap = {
      'text/csv': "https://raw.githubusercontent.com/jluisdeveloper/magna_images/main/CRM/icons/csv.png",
      'application/vnd.ms-excel': "https://raw.githubusercontent.com/jluisdeveloper/magna_images/main/CRM/icons/xls.png",
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': "https://raw.githubusercontent.com/jluisdeveloper/magna_images/main/CRM/icons/xls.png",
      'application/vnd.ms-powerpoint': "https://raw.githubusercontent.com/jluisdeveloper/magna_images/main/CRM/icons/ppt.png",
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': "https://raw.githubusercontent.com/jluisdeveloper/magna_images/main/CRM/icons/ppt.png",
      'application/pdf': "https://raw.githubusercontent.com/jluisdeveloper/magna_images/main/CRM/icons/pdf.png",
      'application/zip': "https://raw.githubusercontent.com/jluisdeveloper/magna_images/main/CRM/icons/zip.png",
      'text/plain': "https://raw.githubusercontent.com/jluisdeveloper/magna_images/main/CRM/icons/txt.png",
      'application/msword': "https://raw.githubusercontent.com/jluisdeveloper/magna_images/main/CRM/icons/doc.png",
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': "https://raw.githubusercontent.com/jluisdeveloper/magna_images/main/CRM/icons/doc.png",
    };

    if (_file.type.includes('image')) {
      return "https://raw.githubusercontent.com/jluisdeveloper/magna_images/main/CRM/icons/img.png";
    }

    return iconMap[_file.type] || "https://raw.githubusercontent.com/jluisdeveloper/magna_images/main/CRM/icons/def.png";
  };

  const removeItem = (_index) => {
    const _files = [...files];
    const _realFiles = [...props.realFiles];
    _files.splice(_index, 1);
    _realFiles.splice(_index, 1);
    setFiles(_files);
    props.setRealFiles(_realFiles);
  };

  return (
    <div className="p-8 border-b border-gray-300 mb-5 dark:border-gray-600">
      <div
        {...getRootProps({
          className: `dropzone 
            ${isDragActive ? 'bg-gray-200 dark:bg-gray-700' : 'bg-gray-100 dark:bg-gray-800'} 
            ${isDragAccept ? 'border-green-500' : 'border-gray-300 dark:border-gray-600'} 
            ${isDragReject ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} 
            flex justify-center items-center cursor-pointer h-40 w-full border-2 border-dashed outline-none transition-all
          `
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-gray-700 dark:text-white">Suelta los archivos aquí ...</p>
        ) : (
          <p className="text-gray-700 dark:text-white">Arrastra y suelta los archivos aquí, o haz click para seleccionar archivos</p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap">
        {props.realFiles && props.realFiles.length > 0 && files.length > 0 ? (
          files.map((file, index) => (
            <div 
              className="p-4 bg-gray-100 rounded flex items-center justify-between mr-4 mb-4 dark:bg-gray-700" 
              key={index}
            >
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
              
              <GeneralTooltip 
                content="Eliminar Archivo"
                triggerContent={
                  <Button
                    variant="destructive"
                    size="sm"
                    className="mt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(index);
                    }}
                  >
                    🗑️ Eliminar
                  </Button>
                }
              />
            </div>
          ))
        ) : null}
      </div>
    </div>
  )
}

export default AppDropzone