import React, { useState } from 'react'
import axios from 'axios'

const ForgotPassword = () => {
 const [identifier, setIdentifier] = useState('')
 const [method, setMethod] = useState('email')
 const [message, setMessage] = useState('')
 const [successMessage, setSuccessMessage] = useState('')

 // const handleSubmit = async (event) => {
 //   event.preventDefault()
 //   try {
 //     if (method === 'email') {
 //       await axios.post('https://api/v1/general/password/forgot_password', { email: identifier })
 //       setMessage('')
 //       setSuccessMessage('Correo enviado con las instrucciones necesarias, puedes cerrar esta pestaña')
 //     }else if (method === 'whatsapp') {
 //       await axios.post('https:///api/v1/general/password/forgot_password_by_phone', { phone: identifier })
 //       setMessage('')
 //       setSuccessMessage('whatsapp enviado con las instrucciones necesarias, puedes cerrar esta pestaña')
 //     }
 //   } catch (error) {
 //     setSuccessMessage('')
 //     setMessage(error.response.data.error)
 //   }
 // }

 const handleSubmit = async (event) => {
   event.preventDefault()
   try {
     if (method === 'email') {
       await axios.post('http://127.0.0.1:8080/api/v1/general/password/forgot_password', { email: identifier })
       setMessage('')
       setSuccessMessage('Correo enviado con las instrucciones necesarias, puedes cerrar esta pestaña')
     }else if (method === 'whatsapp') {
       await axios.post('http://127.0.0.1:8080/api/v1/general/password/forgot_password_by_phone', { phone: identifier })
       setMessage('')
       setSuccessMessage('whatsapp enviado con las instrucciones necesarias, puedes cerrar esta pestaña')
     }
   } catch (error) {
     setSuccessMessage('')
     setMessage(error.response.data.error)
   }
 }

 return (
  <div className="flex items-center justify-center h-screen bg-gray-800">
   <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
    <h2 className="text-2xl mb-4 text-center text-black">Cambiar Contraseña</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
     <input
      type="text"
      className="w-full px-4 py-2 border rounded-md text-black"
      placeholder="Ingrese su Email o número telefono"
      value={identifier}
      onChange={(e) => setIdentifier(e.target.value)}
      required
     />
     <div className="space-y-2 text-black">
      <label className="flex items-center">
       <input
        type="radio"
        value="email"
        checked={method === 'email'}
        onChange={() => setMethod('email')}
        className="mr-2"
       />
       Recuperar mediante correo
      </label>
      {/* <label className="flex items-center">
              <input
                type="radio"
                value="whatsapp"
                checked={method === 'whatsapp'}
                onChange={() => setMethod('whatsapp')}
                className="mr-2"
              />
              Recuperar mediante número Telefonico
            </label> */}
     </div>
     <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
      Submit
     </button>
    </form>
    {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    {successMessage && <p className="mt-4 text-center text-green-500">{successMessage}</p>}
   </div>
  </div>
 )
}

export default ForgotPassword
