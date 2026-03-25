import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Booking() {
  const [formData, setFormData] = useState({
    customerName: '',
    date: '',
    time: '',
    peopleCount: '',
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
      const response = await fetch('http://localhost:5000/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('تم حفظ الحجز بنجاح في قاعدة البيانات')

        setFormData({
          customerName: '',
          date: '',
          time: '',
          peopleCount: '',
        })

        setTimeout(() => {
          navigate('/my-bookings')
        }, 1000)
      } else {
        setMessage(data.message || 'فشل حفظ الحجز')
      }
    } catch {
      setMessage('حدث خطأ في الاتصال بالسيرفر')
    }
  }

  return (
    <div className="form-card">
      <h1>صفحة الحجز</h1>
      <p className="form-subtitle">
        من هنا سيتم تنفيذ حجز الطاولة في المطعم الذي اخترته.
      </p>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="customerName"
          placeholder="اسم العميل"
          value={formData.customerName}
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />

        <input
          type="number"
          name="peopleCount"
          placeholder="عدد الأشخاص"
          value={formData.peopleCount}
          onChange={handleChange}
        />

        <button type="submit" className="form-btn">
          تأكيد الحجز
        </button>
      </form>

      {message && <p className="form-note">{message}</p>}
    </div>
  )
}

export default Booking