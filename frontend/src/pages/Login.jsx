import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        setMessage('تم تسجيل الدخول بنجاح')
        navigate('/dashboard')
      } else {
        setMessage(data.message || 'فشل تسجيل الدخول')
      }
    } catch (error) {
      console.log(error)
      setMessage('حدث خطأ في الاتصال بالسيرفر')
    }
  }

  return (
    <div className="form-card">
      <h1>تسجيل الدخول</h1>
      <p className="form-subtitle">
        أدخل بريدك الإلكتروني وكلمة المرور للوصول إلى حسابك.
      </p>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="البريد الإلكتروني"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="كلمة المرور"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit" className="form-btn">
          دخول
        </button>
      </form>

      {message && <p className="form-note">{message}</p>}
    </div>
  )
}

export default Login