import { useEffect, useState } from 'react'

function MyBookings() {
  const [bookings, setBookings] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:5000/bookings')
        const data = await response.json()

        if (response.ok) {
          setBookings(data)
        } else {
          setMessage('فشل تحميل الحجوزات')
        }
      } catch {
        setMessage('حدث خطأ في الاتصال بالسيرفر')
      }
    }

    fetchBookings()
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ar-EG')
  }

  const formatTime = (timeString) => {
    return timeString.slice(0, 5)
  }

  return (
    <div className="page-card">
      <h1>حجوزاتي</h1>
      <p className="form-subtitle">
        هنا ستظهر جميع الحجوزات التي قمت بها داخل المنصة.
      </p>

      {message && <p className="form-note">{message}</p>}

      {bookings.length === 0 ? (
        <p className="form-note">لا يوجد حجوزات محفوظة حاليًا.</p>
      ) : (
        <div className="added-restaurants">
          {bookings.map((booking) => (
            <div className="added-card" key={booking.id}>
              <h3>حجز رقم {booking.id}</h3>
              <p>اسم العميل: {booking.customer_name}</p>
              <p>التاريخ: {formatDate(booking.booking_date)}</p>
              <p>الوقت: {formatTime(booking.booking_time)}</p>
              <p>عدد الأشخاص: {booking.people_count}</p>
              <p>الحالة: تم تأكيد الحجز</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyBookings