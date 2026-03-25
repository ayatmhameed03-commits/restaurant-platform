
import { useEffect, useState } from 'react'

function Menu() {
  const [formData, setFormData] = useState({
    restaurantId: '',
    name: '',
    description: '',
    price: '',
  })

  const [menuItems, setMenuItems] = useState([])
  const [message, setMessage] = useState('')
  const [editId, setEditId] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/menu-items')
        const data = await response.json()

        if (response.ok) {
          setMenuItems(data)
        } else {
          setMessage('فشل تحميل الوجبات')
        }
      } catch {
        setMessage('حدث خطأ في الاتصال بالسيرفر')
      }
    }

    fetchMenuItems()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const resetForm = () => {
    setFormData({
      restaurantId: '',
      name: '',
      description: '',
      price: '',
    })
    setEditId(null)
  }

  const fetchAllMenuItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/menu-items')
      const data = await response.json()

      if (response.ok) {
        setMenuItems(data)
      }
    } catch {
      setMessage('حدث خطأ في تحديث الوجبات')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const url = editId
        ? `http://localhost:5000/menu-items/${editId}`
        : 'http://localhost:5000/menu-items'

      const method = editId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(editId ? 'تم تعديل الوجبة بنجاح' : 'تمت إضافة الوجبة بنجاح')
        resetForm()
        fetchAllMenuItems()
      } else {
        setMessage(data.message || 'فشل العملية')
      }
    } catch {
      setMessage('حدث خطأ في الاتصال بالسيرفر')
    }
  }

  const handleEdit = (item) => {
    setFormData({
      restaurantId: item.restaurant_id,
      name: item.name,
      description: item.description,
      price: item.price,
    })
    setEditId(item.id)
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/menu-items/${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('تم حذف الوجبة بنجاح')
        fetchAllMenuItems()
      } else {
        setMessage(data.message || 'فشل حذف الوجبة')
      }
    } catch {
      setMessage('حدث خطأ في الاتصال بالسيرفر')
    }
  }

  const filteredMenuItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="page-card">
      <h1>قائمة الطعام</h1>
      <p className="form-subtitle">
        من هنا يمكنك إضافة الوجبات وتعديلها وحذفها والبحث عنها.
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
          name="name"
          placeholder="اسم الوجبة"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="وصف الوجبة"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="number"
          step="0.01"
          name="price"
          placeholder="السعر"
          value={formData.price}
          onChange={handleChange}
        />

        <button type="submit" className="form-btn">
          {editId ? 'حفظ التعديل' : 'إضافة وجبة'}
        </button>
      </form>

      <input
        type="text"
        placeholder="ابحث عن وجبة بالاسم"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {message && <p className="form-note">{message}</p>}

      <div className="added-restaurants">
        {filteredMenuItems.map((item) => (
          <div className="added-card" key={item.id}>
            <h3>{item.name}</h3>
            <p>رقم المطعم: {item.restaurant_id}</p>
            <p>الوصف: {item.description}</p>
            <p>السعر: {item.price}</p>

            <div className="card-actions">
              <button className="edit-btn" onClick={() => handleEdit(item)}>
                تعديل
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(item.id)}
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Menu