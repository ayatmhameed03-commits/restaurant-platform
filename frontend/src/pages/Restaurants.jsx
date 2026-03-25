import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Restaurants() {
  const [restaurants, setRestaurants] = useState([])
  const [message, setMessage] = useState('')
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const navigate = useNavigate()
  const itemsPerPage = 3

  const fetchRestaurants = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/restaurants')
      const data = await response.json()

      if (response.ok) {
        setRestaurants(data)
      } else {
        setMessage('فشل تحميل المطاعم')
      }
    } catch {
      setMessage('حدث خطأ في الاتصال بالسيرفر')
    }
  }

  useEffect(() => {
    fetchRestaurants()
  }, [])

  const handleDeleteRestaurant = async (id) => {
    const confirmDelete = window.confirm('هل أنتِ متأكدة من حذف المطعم؟')
    if (!confirmDelete) return

    try {
      const response = await fetch(`http://127.0.0.1:5000/restaurants/${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('تم حذف المطعم بنجاح')
        fetchRestaurants()
      } else {
        setMessage(data.message || 'فشل حذف المطعم')
      }
    } catch {
      setMessage('حدث خطأ في الاتصال بالسيرفر')
    }
  }

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filteredRestaurants.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentRestaurants = filteredRestaurants.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    setCurrentPage(1)
  }

  return (
    <div className="restaurants-page">
      <div className="restaurants-hero">
        <h1>المطاعم المتوفرة</h1>
        <p>
          اكتشفي أجمل المطاعم داخل المنصة، ابحثي بسهولة، واستمتعي بواجهة
          احترافية مليئة بالصور والكروت الأنيقة.
        </p>
      </div>

      <input
        type="text"
        placeholder="ابحثي عن مطعم بالاسم"
        value={search}
        onChange={handleSearchChange}
        className="search-input"
      />

      {message && <p className="form-note">{message}</p>}

      {filteredRestaurants.length === 0 ? (
        <p className="form-note">لا يوجد مطاعم مطابقة للبحث.</p>
      ) : (
        <>
          <div className="luxury-restaurants-grid">
            {currentRestaurants.map((restaurant) => (
              <div className="luxury-restaurant-card" key={restaurant.id}>
                <div className="luxury-image-wrap">
                  {restaurant.image_url ? (
                    <img
                      src={restaurant.image_url}
                      alt={restaurant.name}
                      className="luxury-restaurant-image"
                    />
                  ) : (
                    <div className="luxury-restaurant-image placeholder-box">
                      <span>لا توجد صورة</span>
                    </div>
                  )}
                </div>

                <div className="luxury-restaurant-content">
                  <span className="restaurant-tag">{restaurant.category}</span>
                  <h3>{restaurant.name}</h3>
                  <p className="restaurant-location">📍 {restaurant.location}</p>

                  <div className="restaurant-actions">
                    <button
                      className="reserve-btn"
                      onClick={() => navigate('/booking')}
                    >
                      احجز الآن
                    </button>

                    <button
                      className="remove-btn"
                      onClick={() => handleDeleteRestaurant(restaurant.id)}
                    >
                      حذف المطعم
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button
              className="edit-btn"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              السابق
            </button>

            <span className="page-number">
              الصفحة {currentPage} من {totalPages}
            </span>

            <button
              className="edit-btn"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              التالي
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Restaurants