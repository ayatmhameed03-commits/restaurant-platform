import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Restaurants from './pages/Restaurants'
import Dashboard from './pages/Dashboard'
import ManageRestaurants from './pages/ManageRestaurants'
import Booking from './pages/Booking'
import MyBookings from './pages/MyBookings'
import Menu from './pages/Menu'
import Ratings from './pages/Ratings'
import Comments from './pages/Comments'
import './App.css'

function App() {
  return (
    <Router>
      <div className="page">
        <div className="navbar">
          <div className="logo">منصة المطاعم</div>

          <div className="nav-links" dir="rtl">
            <Link to="/">الرئيسية</Link>
            <Link to="/restaurants">المطاعم</Link>
            <Link to="/menu">المنيو</Link>
            <Link to="/ratings">التقييم</Link>
            <Link to="/comments">التعليقات</Link>
            <Link to="/about">من نحن</Link>
            <Link to="/contact">تواصل</Link>
            <Link to="/login">دخول</Link>
            <Link to="/register">حساب جديد</Link>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/ratings" element={<Ratings />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manage-restaurants" element={<ManageRestaurants />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App