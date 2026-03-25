import { useEffect, useState } from 'react'

function Ratings() {
  const [formData, setFormData] = useState({
    restaurantId: '',
    customerName: '',
    rating: '',
  })

  const [ratings, setRatings] = useState([])
  const [message, setMessage] = useState('')

  const fetchRatings = async () => {
    try {
      const response = await fetch('http://localhost:5000/ratings')
      const data = await response.json()

      if (response.ok) {
        setRatings(data)
      } else {
        setMessage('فشل تحميل التقييمات')
      }
    } catch {
      setMessage('حدث خطأ في الاتصال بالسيرفر')
    }
  }

  useEffect(() => {
    fetchRatings()
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
      const response = await fetch('http://localhost:5000/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('تم إضافة التقييم بنجاح')
        setFormData({
          restaurantId: '',
          customerName: '',
          rating: '',
        })
        fetchRatings()
      } else {
        setMessage(data.message || 'فشل إضافة التقييم')
      }
    } catch {
      setMessage('حدث خطأ في الاتصال بالسيرفر')
    }
  }

  return (
    <div className="page-card">
      <h1>تقييم المطاعم</h1>
      <p className="form-subtitle">
        من هنا يمكنك إضافة تقييم جديد وعرض التقييمات المحفوظة.
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
          type="number"
          name="rating"
          min="1"
          max="5"
          placeholder="التقييم من 1 إلى 5"
          value={formData.rating}
          onChange={handleChange}
        />

        <button type="submit" className="form-btn">
          إضافة تقييم
        </button>
      </form>

      {message && <p className="form-note">{message}</p>}

      <div className="added-restaurants">
        {ratings.map((item) => (
          <div className="added-card" key={item.id}>
            <h3>تقييم رقم {item.id}</h3>
            <p>رقم المطعم: {item.restaurant_id}</p>
            <p>اسم العميل: {item.customer_name}</p>
            <p>التقييم: {item.rating} / 5</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Ratings