'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'

type Stage = 'cover' | 'video1' | 'form1' | 'video2' | 'form2'

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

      setStage('form2')
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
          <button
            className={styles.primaryBtn}
            onClick={() => setStage('form1')}
          >
            Confirmar Asistencia
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
          <button
            className={styles.primaryBtn}
            onClick={() => setStage('form2')}
          >
            Continuar
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
    </main>
  )
}
