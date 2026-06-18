import { useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { portfolioApi } from '@/services/api'
import type { Profile } from '@/types/portfolio'
import styles from './sections.module.css'

interface ContactSectionProps {
  profile: Profile
  onSuccess?: () => void
  onError?: () => void
}

export function ContactSection({ profile, onSuccess, onError }: ContactSectionProps) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const mutation = useMutation({
    mutationFn: () => portfolioApi.sendContact(form),
    onSuccess: (data) => {
      toast.success(data.message)
      onSuccess?.()
      setForm({ name: '', email: '', subject: '', message: '' })
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Erro ao enviar mensagem')
      onError?.()
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate()
  }

  return (
    <section className={styles.section} id="contact">
      <div className={`${styles.panel} pixel-border`}>
        <h2 className={styles.title}>
          <span className={styles.coin} /> CONTATO
        </h2>

        <div className={styles.contactInfo}>
          <p>📞 {profile.phone}</p>
          <p>✉ {profile.email}</p>
        </div>

        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="SEU NOME"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            minLength={2}
            className={styles.input}
          />
          <input
            type="email"
            placeholder="SEU EMAIL"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className={styles.input}
          />
          <input
            type="text"
            placeholder="ASSUNTO"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className={styles.input}
          />
          <textarea
            placeholder="SUA MENSAGEM..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            minLength={10}
            rows={4}
            className={styles.textarea}
          />
          <button
            type="submit"
            className="pixel-btn pixel-btn--green"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'ENVIANDO...' : '▶ ENVIAR'}
          </button>
        </form>
      </div>
    </section>
  )
}
