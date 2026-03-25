import { useState } from 'react'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  })

  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      setMessage('كلمتا المرور غير متطابقتين')
      return
    }

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('تم إنشاء الحساب بنجاح')
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: 'user',
        })
      } else {
        setMessage(data.message || 'فشل إنشاء الحساب')
      }
    } catch  {
      setMessage('حدث خطأ في الاتصال بالسيرفر')
    }
  }

  return (
    <div className="page">
      <div className="form-card">
        <h1>إنشاء حساب</h1>
        <p className="form-subtitle">
          أنشئ حسابًا جديدًا للبدء باستخدام منصة إدارة المطاعم
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="الاسم الكامل"
            value={formData.name}
            onChange={handleChange}
          />

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

          <input
            type="password"
            name="confirmPassword"
            placeholder="تأكيد كلمة المرور"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="role-select"
          >
            <option value="user">مستخدم</option>
            <option value="owner">صاحب مطعم</option>
          </select>

          <button type="submit" className="form-btn">
            إنشاء حساب
          </button>
        </form>

        {message && <p className="form-note">{message}</p>}
      </div>
    </div>
  )
}

export default Register