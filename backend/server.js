const express = require('express')
const cors = require('cors')
const pool = require('./db')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Restaurant Platform API is running')
})

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()')
    res.json({
      message: 'Database connected successfully',
      time: result.rows[0],
    })
  } catch (error) {
    res.status(500).json({
      message: 'Database connection failed',
      error: error.message,
    })
  }
})

app.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    const newUser = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, password, role]
    )

    res.status(201).json({
      message: 'User registered successfully',
      user: newUser.rows[0],
    })
  } catch (error) {
    res.status(500).json({
      message: 'Registration failed',
      error: error.message,
    })
  }
})

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const userResult = await pool.query(
      'SELECT * FROM users WHERE email = $1 AND password = $2',
      [email, password]
    )

    if (userResult.rows.length === 0) {
      return res.status(401).json({
        message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
      })
    }

    const user = userResult.rows[0]

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      'mysecretkey',
      { expiresIn: '1h' }
    )

    res.status(200).json({
      message: 'تم تسجيل الدخول بنجاح',
      token,
      user,
    })
  } catch (error) {
    res.status(500).json({
      message: 'فشل تسجيل الدخول',
      error: error.message,
    })
  }
})

app.post('/restaurants', async (req, res) => {
  try {
    const { name, category, location, imageUrl } = req.body

    const newRestaurant = await pool.query(
      'INSERT INTO restaurants (name, category, location, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, category, location, imageUrl]
    )

    res.status(201).json({
      message: 'تمت إضافة المطعم بنجاح',
      restaurant: newRestaurant.rows[0],
    })
  } catch (error) {
    res.status(500).json({
      message: 'فشل إضافة المطعم',
      error: error.message,
    })
  }
})

app.get('/restaurants', async (req, res) => {
  try {
    const allRestaurants = await pool.query(
      'SELECT * FROM restaurants ORDER BY id DESC'
    )

    res.status(200).json(allRestaurants.rows)
  } catch (error) {
    res.status(500).json({
      message: 'فشل جلب المطاعم',
      error: error.message,
    })
  }
})

app.post('/bookings', async (req, res) => {
  try {
    const { customerName, date, time, peopleCount } = req.body

    const newBooking = await pool.query(
      'INSERT INTO bookings (customer_name, booking_date, booking_time, people_count) VALUES ($1, $2, $3, $4) RETURNING *',
      [customerName, date, time, peopleCount]
    )

    res.status(201).json({
      message: 'تم حفظ الحجز بنجاح',
      booking: newBooking.rows[0],
    })
  } catch (error) {
    res.status(500).json({
      message: 'فشل حفظ الحجز',
      error: error.message,
    })
  }
})

app.get('/bookings', async (req, res) => {
  try {
    const allBookings = await pool.query(
      'SELECT * FROM bookings ORDER BY id DESC'
    )

    res.status(200).json(allBookings.rows)
  } catch (error) {
    res.status(500).json({
      message: 'فشل جلب الحجوزات',
      error: error.message,
    })
  }
})

app.post('/menu-items', async (req, res) => {
  try {
    const { restaurantId, name, description, price } = req.body

    const newItem = await pool.query(
      'INSERT INTO menu_items (restaurant_id, name, description, price) VALUES ($1, $2, $3, $4) RETURNING *',
      [restaurantId, name, description, price]
    )

    res.status(201).json({
      message: 'تمت إضافة الوجبة بنجاح',
      item: newItem.rows[0],
    })
  } catch (error) {
    res.status(500).json({
      message: 'فشل إضافة الوجبة',
      error: error.message,
    })
  }
})

app.get('/menu-items', async (req, res) => {
  try {
    const allItems = await pool.query(
      'SELECT * FROM menu_items ORDER BY id DESC'
    )

    res.status(200).json(allItems.rows)
  } catch (error) {
    res.status(500).json({
      message: 'فشل جلب الوجبات',
      error: error.message,
    })
  }
})

app.put('/menu-items/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { restaurantId, name, description, price } = req.body

    const updatedItem = await pool.query(
      'UPDATE menu_items SET restaurant_id = $1, name = $2, description = $3, price = $4 WHERE id = $5 RETURNING *',
      [restaurantId, name, description, price, id]
    )

    res.status(200).json({
      message: 'تم تعديل الوجبة بنجاح',
      item: updatedItem.rows[0],
    })
  } catch (error) {
    res.status(500).json({
      message: 'فشل تعديل الوجبة',
      error: error.message,
    })
  }
})

app.delete('/menu-items/:id', async (req, res) => {
  try {
    const { id } = req.params

    await pool.query('DELETE FROM menu_items WHERE id = $1', [id])

    res.status(200).json({
      message: 'تم حذف الوجبة بنجاح',
    })
  } catch (error) {
    res.status(500).json({
      message: 'فشل حذف الوجبة',
      error: error.message,
    })
  }
})

app.post('/ratings', async (req, res) => {
  try {
    const { restaurantId, customerName, rating } = req.body

    const newRating = await pool.query(
      'INSERT INTO ratings (restaurant_id, customer_name, rating) VALUES ($1, $2, $3) RETURNING *',
      [restaurantId, customerName, rating]
    )

    res.status(201).json({
      message: 'تم إضافة التقييم بنجاح',
      rating: newRating.rows[0],
    })
  } catch (error) {
    res.status(500).json({
      message: 'فشل إضافة التقييم',
      error: error.message,
    })
  }
})

app.get('/ratings', async (req, res) => {
  try {
    const allRatings = await pool.query(
      'SELECT * FROM ratings ORDER BY id DESC'
    )

    res.status(200).json(allRatings.rows)
  } catch (error) {
    res.status(500).json({
      message: 'فشل جلب التقييمات',
      error: error.message,
    })
  }
})

app.post('/comments', async (req, res) => {
  try {
    const { restaurantId, customerName, commentText } = req.body

    const newComment = await pool.query(
      'INSERT INTO comments (restaurant_id, customer_name, comment_text) VALUES ($1, $2, $3) RETURNING *',
      [restaurantId, customerName, commentText]
    )

    res.status(201).json({
      message: 'تم إضافة التعليق بنجاح',
      comment: newComment.rows[0],
    })
  } catch (error) {
    res.status(500).json({
      message: 'فشل إضافة التعليق',
      error: error.message,
    })
  }
})

app.get('/comments', async (req, res) => {
  try {
    const allComments = await pool.query(
      'SELECT * FROM comments ORDER BY id DESC'
    )

    res.status(200).json(allComments.rows)
  } catch (error) {
    res.status(500).json({
      message: 'فشل جلب التعليقات',
      error: error.message,
    })
  }
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})