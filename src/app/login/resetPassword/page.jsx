"use client";
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const ResetPassword = () => {
  const { operation_code, expires_at } = useParams()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [recoveryCode, setRecoveryCode] = useState('')
  const [timeLeft, setTimeLeft] = useState(null)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordUpdated, setPasswordUpdated] = useState(false)

  useEffect(() => {
    if (expires_at) {
      const expirationTime = new Date(expires_at).getTime()
      const currentTime = new Date().getTime()
      setTimeLeft(Math.floor((expirationTime - currentTime) / 1000))
    }
  }, [expires_at])

  useEffect(() => {
    if (timeLeft !== null) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime > 0 ? prevTime - 1 : 0)
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [timeLeft])

  useEffect(() => {
    if (timeLeft === 0) {
      setMessage('Tiempo expirado, por favor solicita un nuevo código')
      navigate('/forgot-password')
    }
  }, [timeLeft, navigate])

  const handleSubmitCode = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('https://rpute/api/v1/general/password/validate_code', { recovery_code: recoveryCode })
      // const response = await axios.post('http://127.0.0.1:8080/api/v1/general/password/validate_code', { recovery_code: recoveryCode })

      if (response.data.valid) {
        setStep(2)
        setMessage('')
      } else {
        setMessage('Código invalido.')
      }
    } catch (error) {
      setMessage('Código incorrecto')
    }
  }

  const handleSubmitPassword = async (event) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.')
      return
    }
    try {
      await axios.post('https:/route/api/v1/general/password/reset_password', {
        operation_code,
        recovery_code: recoveryCode,
        password,
      })
      setMessage('Password Actualizado de forma correcta')
      setPasswordUpdated(true)
      setTimeout(() => {
        navigate('/')
      }, 5000)
    } catch (error) {
      setMessage('Error updating password.')
    }
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {step === 1 && (
          <form onSubmit={handleSubmitCode} className="space-y-4">
            <h2 className="text-2xl mb-4 text-center text-black">Reset Password</h2>
            <div className="flex justify-center space-x-2">
              <input
                type="text"
                maxLength="1"
                className="w-12 h-12 text-center border rounded text-black"
                value={recoveryCode[0] || ''}
                onChange={(e) => setRecoveryCode(recoveryCode.slice(0, 0) + e.target.value + recoveryCode.slice(1))}
              />
              <input
                type="text"
                maxLength="1"
                className="w-12 h-12 text-center border rounded text-black"
                value={recoveryCode[1] || ''}
                onChange={(e) => setRecoveryCode(recoveryCode.slice(0, 1) + e.target.value + recoveryCode.slice(2))}
              />
              <input
                type="text"
                maxLength="1"
                className="w-12 h-12 text-center border rounded text-black"
                value={recoveryCode[2] || ''}
                onChange={(e) => setRecoveryCode(recoveryCode.slice(0, 2) + e.target.value + recoveryCode.slice(3))}
              />
              <input
                type="text"
                maxLength="1"
                className="w-12 h-12 text-center border rounded text-black"
                value={recoveryCode[3] || ''}
                onChange={(e) => setRecoveryCode(recoveryCode.slice(0, 3) + e.target.value)}
              />
            </div>
            {timeLeft > 0 ? (
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                Next
              </button>
            ) : (
              <button
                type="button"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                onClick={() => navigate('/forgot-password')}
              >
                Solicitar nuevo código
              </button>
            )}
            {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            <p className="mt-4 text-center text-green-500">Tiempo restante: {formatTime(timeLeft)}</p>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleSubmitPassword} className="space-y-4">
            <h2 className="text-2xl mb-4 text-center text-black">Cambiar Contraseña</h2>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border rounded-md text-black"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-black"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Ocultar" : "Ver"}
              </button>
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full px-4 py-2 border rounded-md text-black"
                placeholder="Confirma tu contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-black"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Ocultar" : "Ver"}
              </button>
            </div>
            {timeLeft > 0 ? (
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                Submit
              </button>
            ) : (
              <button
                type="button"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                onClick={() => navigate('/forgot-password')}
              >
                Solicitar nuevo código
              </button>
            )}
            {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            <p className="mt-4 text-center text-green-500">Tiempo restante: {formatTime(timeLeft)}</p>
            {passwordUpdated && (
              <p className="mt-4 text-center text-green-500">
                Contraseña actualizada correctamente. Serás redirigido en 5 segundos...
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  )
}

export default ResetPassword
