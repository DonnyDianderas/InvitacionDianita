'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'

type Stage = 'cover' | 'video1' | 'form1' | 'video2' | 'form2' | 'final'

interface FormData {
  nombres: string
  apellidos: string
  acompanante: string
  ninos_asisten: string
}

interface SavedResponse {
  id: number
}

export default function Home() {
  const [stage, setStage] = useState<Stage>('cover')
  const [formData, setFormData] = useState<FormData>({
    nombres: '',
    apellidos: '',
    acompanante: '',
    ninos_asisten: '0',
  })
  const [confirmacionId, setConfirmacionId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Crear burbujas animadas
  useEffect(() => {
    const bubblesContainer = document.body
    for (let i = 0; i < 10; i++) {
      const bubble = document.createElement('div')
      bubble.className = 'bubble'
      bubblesContainer.appendChild(bubble)
    }

    return () => {
      const bubbles = document.querySelectorAll('.bubble')
      bubbles.forEach(b => b.remove())
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNinosChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      ninos_asisten: value,
    }))
  }

  const validateForm = () => {
    if (!formData.nombres.trim()) {
      setError('Por favor ingresa tu nombre')
      return false
    }
    if (!formData.apellidos.trim()) {
      setError('Por favor ingresa tu apellido')
      return false
    }
    setError('')
    return true
  }

  const handleSubmitForm1 = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      const response = await fetch('/api/rsvp/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombres: formData.nombres,
          apellidos: formData.apellidos,
          acompanante: formData.acompanante,
          ninos_asisten: parseInt(formData.ninos_asisten),
        }),
      })

      if (!response.ok) {
        throw new Error('Error al guardar confirmación')
      }

      const data: SavedResponse = await response.json()
      setConfirmacionId(data.id)
      setStage('video2')
    } catch (err) {
      setError('Error al guardar datos. Por favor intenta de nuevo.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handlePunctualityChoice = async (choice: string) => {
    if (!confirmacionId) return

    setLoading(true)
    try {
      const response = await fetch(`/api/rsvp/punctuality/${confirmacionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ puntualidad: choice }),
      })

      if (!response.ok) {
        throw new Error('Error al guardar respuesta')
      }

      setStage('final')
    } catch (err) {
      setError('Error al guardar respuesta. Por favor intenta de nuevo.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className={styles.container}>
      {stage === 'cover' && (
        <div className={styles.coverStage}>
          <div className={styles.coverContent}>
            <h1>¡Cumpleaños Dianita!</h1>
            <p className={styles.subtitle}>5 años</p>
            <p className={styles.invitation}>
              Te esperamos en una aventura marina llena de magia
            </p>
            <button
              className={styles.primaryBtn}
              onClick={() => setStage('video1')}
            >
              ¡Entrar!
            </button>
          </div>
        </div>
      )}

      {stage === 'video1' && (
        <div className={styles.videoStage}>
          <div className={styles.videoWithContent}>
            <div className={styles.sebastianContainer}>
              <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                {/* Cangrejo Sebastián */}
                <circle cx="60" cy="60" r="35" fill="#FF4500" />
                {/* Ojos */}
                <circle cx="50" cy="45" r="6" fill="white" />
                <circle cx="70" cy="45" r="6" fill="white" />
                <circle cx="50" cy="45" r="3" fill="black" />
                <circle cx="70" cy="45" r="3" fill="black" />
                {/* Sonrisa */}
                <path d="M 50 60 Q 60 70 70 60" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" />
                {/* Tenazas izquierda */}
                <ellipse cx="20" cy="60" rx="12" ry="20" fill="#FF6347" transform="rotate(-30 20 60)" />
                <ellipse cx="15" cy="50" rx="8" ry="15" fill="#FF4500" />
                {/* Tenazas derecha */}
                <ellipse cx="100" cy="60" rx="12" ry="20" fill="#FF6347" transform="rotate(30 100 60)" />
                <ellipse cx="105" cy="50" rx="8" ry="15" fill="#FF4500" />
                {/* Patas */}
                <line x1="45" y1="90" x2="35" y2="110" stroke="#FF4500" strokeWidth="3" />
                <line x1="60" y1="95" x2="60" y2="115" stroke="#FF4500" strokeWidth="3" />
                <line x1="75" y1="90" x2="85" y2="110" stroke="#FF4500" strokeWidth="3" />
              </svg>
            </div>

            <p className={styles.scriptText}>
              🎤 ¡Amiguitos los espero en mi cumpleaños! <br />
              Por favor... ¡Anótense!
            </p>

            <div className={styles.videoContainer}>
              <video
                width="100%"
                height="auto"
                controls
                autoPlay
                className={styles.video}
              >
                <source
                  src="/videos/Dianita_Invitación_cumple5.mp4"
                  type="video/mp4"
                />
                Tu navegador no soporta video HTML5
              </video>
            </div>
          </div>
          <button
            className={styles.primaryBtn}
            onClick={() => setStage('form1')}
          >
            ✍️ Confirmar Asistencia
          </button>
        </div>
      )}

      {stage === 'form1' && (
        <div className={styles.formStage}>
          <div className={styles.formContainer}>
            <h2>Confirma tu Asistencia</h2>
            <form className={styles.form} onSubmit={handleSubmitForm1}>
              <div className={styles.formGroup}>
                <label className={styles.formGroupLabel} htmlFor="nombres">Tu Nombre</label>
                <input
                  className={styles.formInput}
                  type="text"
                  id="nombres"
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleInputChange}
                  placeholder="Escribe tu nombre"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formGroupLabel} htmlFor="apellidos">Tus Apellidos</label>
                <input
                  className={styles.formInput}
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleInputChange}
                  placeholder="Escribe tus apellidos"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formGroupLabel} htmlFor="acompanante">
                  Nombre del Acompañante (opcional)
                </label>
                <input
                  className={styles.formInput}
                  type="text"
                  id="acompanante"
                  name="acompanante"
                  value={formData.acompanante}
                  onChange={handleInputChange}
                  placeholder="Si asistes con alguien, escribe su nombre"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formGroupLabel}>¿Cuántos niños asisten contigo?</label>
                <div className={styles.buttonGroup}>
                  {['0', '1', '2', '3'].map(num => (
                    <button
                      key={num}
                      type="button"
                      className={`${styles.optionBtn} ${
                        formData.ninos_asisten === num ? styles.active : ''
                      }`}
                      onClick={() => handleNinosChange(num)}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {error && <p className={styles.error}>{error}</p>}

              <button
                type="submit"
                className={styles.primaryBtn}
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Enviar'}
              </button>
            </form>
          </div>
        </div>
      )}

      {stage === 'video2' && (
        <div className={styles.videoStage}>
          <div className={styles.videoWithContent}>
            <div className={styles.videoContainer}>
              <video
                width="100%"
                height="auto"
                controls
                autoPlay
                className={styles.video}
              >
                <source
                  src="/videos/Dianita_Gracias_cumple5.mp4"
                  type="video/mp4"
                />
                Tu navegador no soporta video HTML5
              </video>
            </div>

            <div className={styles.mapContainer}>
              <iframe
                className={styles.mapEmbed}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.8234567890123!2d-76.12345!3d-12.04567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c7c8d5c6c6c7%3A0x1234567890abcdef!2sAv.%20Bel%C3%A1inde%201220%2C%20Condominio%20Villa%20los%20Molles!5e0!3m2!1ses!2spe!4v1234567890123"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <button
            className={styles.pulsatingBtn}
            onClick={() => setStage('form2')}
          >
            💫 Confirmame tu Puntualidad
          </button>
        </div>
      )}

      {stage === 'form2' && (
        <div className={styles.formStage}>
          <div className={styles.formContainer}>
            <h2>¿Quieres Ganar tu Premio?</h2>
            <p className={styles.subtitle}>
              Debes llegar puntual a la fiesta para ganarlo
            </p>

            <div className={styles.choicesContainer} role="group">
              <button
                className={styles.choiceBtn}
                onClick={() => handlePunctualityChoice('si')}
                disabled={loading}
              >
                <span className={styles.emoji}>✨</span>
                <span>Sí, estaré puntual contigo</span>
              </button>

              <button
                className={styles.choiceBtn}
                onClick={() => handlePunctualityChoice('no')}
                disabled={loading}
              >
                <span className={styles.emoji}>😄</span>
                <span>No, mi mamá es demorona</span>
              </button>
            </div>

            {error && <p className={styles.error}>{error}</p>}
          </div>
        </div>
      )}

      {stage === 'final' && (
        <div className={styles.finalStage}>
          <div className={styles.finalContent}>
            <div className={styles.invitationImageContainer}>
              <img
                src="/images/Invitación de Cumpleaños Dianita.jpg"
                alt="Invitación de Cumpleaños Dianita"
                className={styles.invitationImage}
              />
            </div>
            <div className={styles.finalButtons}>
              <button
                className={styles.primaryBtn}
                onClick={() => setStage('cover')}
              >
                🏠 Volver al Inicio
              </button>
              <button
                className={styles.closeBtn}
                onClick={() => window.close()}
              >
                ✕ Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
