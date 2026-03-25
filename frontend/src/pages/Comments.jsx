/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react'

function Comments() {
  const [formData, setFormData] = useState({
    restaurantId: '',
    customerName: '',
    commentText: '',
  })

  const [comments, setComments] = useState([])
  const [message, setMessage] = useState('')

  const fetchComments = async () => {
    try {
      const response = await fetch('http://localhost:5000/comments')
      const data = await response.json()

      if (response.ok) {
        setComments(data)
      } else {
        setMessage('فشل تحميل التعليقات')
      }
    } catch {
      setMessage('حدث خطأ في الاتصال بالسيرفر')
    }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:5000/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('تم إضافة التعليق بنجاح')
        setFormData({
          restaurantId: '',
          customerName: '',
          commentText: '',
        })
        fetchComments()
      } else {
        setMessage(data.message || 'فشل إضافة التعليق')
      }
    } catch {
      setMessage('حدث خطأ في الاتصال بالسيرفر')
    }
  }

  return (
    <div className="page-card">
      <h1>تعليقات المطاعم</h1>
      <p className="form-subtitle">
        من هنا يمكنك إضافة تعليق جديد وعرض التعليقات المحفوظة.
      </p>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="number"
          name="restaurantId"
          placeholder="رقم المطعم"
          value={formData.restaurantId}
          onChange={handleChange}
        />

        <input
          type="text"
          name="customerName"
          placeholder="اسم العميل"
          value={formData.customerName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="commentText"
          placeholder="اكتب تعليقك"
          value={formData.commentText}
          onChange={handleChange}
        />

        <button type="submit" className="form-btn">
          إضافة تعليق
        </button>
      </form>

      {message && <p className="form-note">{message}</p>}

      <div className="added-restaurants">
        {comments.map((item) => (
          <div className="added-card" key={item.id}>
            <h3>تعليق رقم {item.id}</h3>
            <p>رقم المطعم: {item.restaurant_id}</p>
            <p>اسم العميل: {item.customer_name}</p>
            <p>التعليق: {item.comment_text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Comments