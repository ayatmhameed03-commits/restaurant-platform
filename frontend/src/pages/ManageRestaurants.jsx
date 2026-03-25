import { useState } from 'react'

function ManageRestaurants() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    location: '',
    imageUrl: '',
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

    try {
      const response = await fetch('http://127.0.0.1:5000/restaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('تمت إضافة المطعم بنجاح')
        setFormData({
          name: '',
          category: '',
          location: '',
          imageUrl: '',
        })
      } else {
        setMessage(data.message || 'فشل إضافة المطعم')
      }
    } catch {
      setMessage('حدث خطأ في الاتصال بالسيرفر')
    }
  }

  return (
    <div className="page-card">
      <h1>إدارة المطاعم</h1>
      <p className="form-subtitle">
        أضيفي مطعمًا جديدًا مع صورة ورابط عرض مميز.
      </p>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="اسم المطعم"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="نوع المطعم"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="الموقع"
          value={formData.location}
          onChange={handleChange}
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="رابط صورة المطعم"
          value={formData.imageUrl}
          onChange={handleChange}
        />

        <button type="submit" className="form-btn">
          إضافة مطعم
        </button>
      </form>

      {message && <p className="form-note">{message}</p>}
    </div>
  )
}

export default ManageRestaurants