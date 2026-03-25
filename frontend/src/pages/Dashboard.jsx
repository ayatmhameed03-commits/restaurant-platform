import { Link, useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <div className="page-card">
      <h1>لوحة التحكم</h1>
      <p className="form-subtitle">
        أهلاً بك في لوحة التحكم، من هنا يمكنك إدارة المطاعم والحجوزات والتنقل
        السريع بين أهم صفحات المنصة.
      </p>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🍽️</div>
          <h3>إدارة المطاعم</h3>
          <p>أضف مطاعم جديدة، عدّل البيانات، وتابع المطاعم المسجلة في المنصة.</p>
          <Link to="/manage-restaurants" className="showcase-btn">
            الدخول
          </Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📅</div>
          <h3>الحجوزات</h3>
          <p>نفّذ حجزًا جديدًا أو انتقل إلى صفحة الحجوزات الخاصة بك.</p>
          <Link to="/booking" className="showcase-btn">
            احجز الآن
          </Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📋</div>
          <h3>حجوزاتي</h3>
          <p>شاهد تفاصيل الحجوزات التي قمت بها داخل المنصة .</p>
          <Link to="/my-bookings" className="showcase-btn">
            عرض الحجوزات
          </Link>
        </div>
      </div>

      <div className="hero-actions">
        <button className="delete-btn" onClick={handleLogout}>
          تسجيل الخروج
        </button>
      </div>
    </div>
  )
}

export default Dashboard