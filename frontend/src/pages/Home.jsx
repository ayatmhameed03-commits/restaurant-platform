import { Link } from 'react-router-dom'

function Home() {
  const featuredRestaurants = [
    {
      id: 1,
      name: 'مطعم آيات الشرقي',
      type: 'مأكولات شرقية',
      image:
        'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 2,
      name: 'مطعم ليالي إيطاليا',
      type: 'بيتزا وباستا',
      image:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 3,
      name: 'مطعم أبو عمر للمشاوي',
      type: 'مشاوي عربية',
      image:
        'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80',
    },
  ]

  const galleryImages = [
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80',
  ]

  return (
    <div className="home-page">
      <section className="hero-banner">
        <div className="hero-overlay">
          <span className="hero-badge">منصة لإدارة المطاعم والحجوزات</span>
          <h1>اكتشفي أفضل المطاعم واحجزي بسهولة</h1>
          <p>
        
           
          </p>

          <div className="hero-actions">
            <Link to="/restaurants" className="hero-btn primary-btn">
              استكشاف المطاعم
            </Link>

            <Link to="/register" className="hero-btn secondary-btn">
              إنشاء حساب
            </Link>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-title-wrap">
          <h2>مطاعم مميزة</h2>
        
        </div>

        <div className="featured-grid">
          {featuredRestaurants.map((restaurant) => (
            <div className="featured-card" key={restaurant.id}>
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="featured-card-image"
              />
              <div className="featured-card-content">
                <h3>{restaurant.name}</h3>
                <p>{restaurant.type}</p>
                <Link to="/restaurants" className="card-link-btn">
                  عرض المطاعم
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="gallery-section">
        <div className="section-title-wrap">
          <h2>  الصور عن المطاعم لدينا</h2>
          <p></p>
        </div>

        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <div className="gallery-card" key={index}>
              <img
                src={image}
                alt={`Restaurant ${index + 1}`}
                className="gallery-image"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="quick-info-section">
        <div className="quick-info-card">
          <h3>حجوزات سهلة</h3>
          <p>احجزي طاولتك خلال ثوانٍ مع متابعة بيانات الحجز داخل المنصة.</p>
        </div>

        <div className="quick-info-card">
          <h3>قوائم طعام</h3>
          <p>إضافة الوجبات، تعديلها، حذفها، والبحث عنها بسهولة.</p>
        </div>

        <div className="quick-info-card">
          <h3>تقييمات وتعليقات</h3>
          <p>عرض آراء المستخدمين وإضافة تقييمات لكل مطعم.</p>
        </div>
      </section>
    </div>
  )
}

export default Home